import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import ReviewCard from './ReviewCard';
import Loader from '../common/Loader';
import MessageView from '../common/MessageView';

import { getReviews } from '../../data/reviews';

import { UserContext } from '../../contexts/UserContext';
import { AppContext } from '../../contexts/AppContext';

export default ({ showFollowsOnly, showUser, user }) => {
  // initial state to null, will be set to an empty array (truthy) if fetch returns nothing 
  const [reviews, setReviews] = useState(null)
  const [next, setNext] = useState(null)
  const [isRefreshing, setRefresh] = useState(false)

  const { updates, setUpdates } = useContext(AppContext)
  const { connectedUser } = useContext(UserContext)

  // get reviews page by page and setUpdates to false when done
  
  // load all reviews on first render
  useEffect(() => loadReviews(), [showFollowsOnly])
  // load all reviews when there has been updates
  useEffect(() => { if (updates) { loadReviews() }})
  
  const loadReviews = () => {
    getReviews(user, next)
      .then(res => {
        // check if we are loading a new page of review or not
        // add news reviews to the list if we are
        const data = next ? [...reviews, ...res.reviews] : res.reviews
        // filter to only display reviews with a title and a content
        let filteredData = data.filter(review => review.content && review.title)
        // if showFollowsOnly is true, filter to only show reviews written by people followed by the connectedUser
        if (showFollowsOnly) {
          filteredData = filteredData.filter(review => connectedUser.following.some(userId => review.author._id === userId))
        }
        setReviews(filteredData)
        setNext(res.next)
      })
      .then(() => {
        setRefresh(false)
        setUpdates(false)
      })
      .catch(err => console.log(err))
  }

  // show a loader while we load reviews
  if (updates || !reviews) {
    return (<Loader />)
  }
  
  const renderItem = ({ item }) => <ReviewCard showUser={showUser} review={item} />
  // load next page of reviews if there is one, when we reach the end of the list
  const onEndReached = () => next ? loadReviews() : null;
  const refreshControl = <RefreshControl refreshing={isRefreshing} onRefresh={() => loadReviews()} />
  
  return reviews.length > 0 ? (
    <FlatList
      refreshControl={refreshControl}
      style={styles.list}
      data={reviews}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      onEndReached={() => onEndReached()}
      onEndReachedThreshold={0.5}
    />
  ) : (<MessageView message='Aucune critique.' />)
};

const styles = StyleSheet.create({
  list: {
    padding: 10
  }
})
