import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import ReviewCard from './ReviewCard';
import { getReviews } from '../../data/reviews';
import Loader from '../common/Loader';
import { AppContext } from '../../App';
import MessageView from '../common/MessageView';

export default ({ showUser, user }) => {
  // initial state to null, will be set to an empty array (truthy) if fetch returns nothing 
  const [reviews, setReviews] = useState(null)
  const [next, setNext] = useState(null)

  const { updates, setUpdates } = useContext(AppContext)

  // get reviews page by page and setUpdates to false when done
  const loadReviews = () => {
    getReviews(user, next)
      .then(res => {
        const data = next ? [...reviews, ...res.reviews] : res.reviews
        setReviews(data)
        setNext(res.next)
      })
      .then(() => setUpdates(false))
      .catch(err => console.log(err))
  }

  // load all reviews on first render
  useEffect(() => loadReviews(), [])
  // load all reviews when there has been updates
  useEffect(() => { if (updates) { loadReviews() }})

  // show a loader while we load reviews
  if (updates || !reviews) {
    return (<Loader />)
  }
  
  const renderItem = ({ item }) => <ReviewCard showUser={showUser} review={item} />
  // load next page of reviews if there is one, when we reach the end of the list
  const onEndReached = () => next ? loadReviews() : null;
  
  return reviews.length > 0 ? (
    <FlatList
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
