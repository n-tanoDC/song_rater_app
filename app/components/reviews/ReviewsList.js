import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import ReviewCard from './ReviewCard';
import Loader from '../common/Loader';
import { getReviews } from '../../data/reviews';
import MessageView from '../common/MessageView';

import { AppContext } from '../../AppContext';

export default ({ showUser, user }) => {
  // initial state to null, will be set to an empty array (truthy) if fetch returns nothing 
  const [reviews, setReviews] = useState(null)
  const [next, setNext] = useState(null)
  const [isRefreshing, setRefresh] = useState(false)
  const { updates, setUpdates } = useContext(AppContext)

  // get reviews page by page and setUpdates to false when done
  
  // load all reviews on first render
  useEffect(() => loadReviews(), [])
  // load all reviews when there has been updates
  useEffect(() => { if (updates) { loadReviews() }})
  
  const loadReviews = () => {
    getReviews(user, next)
      .then(res => {
        // check if we are loading a new page of review or not
        // add news reviews to the list if we are
        const data = next ? [...reviews, ...res.reviews] : res.reviews
        // filter to only display reviews with a title and a content
        const filteredData = data.filter(review => review.content && review.title)
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
