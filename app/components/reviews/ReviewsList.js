import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ReviewCard from './ReviewCard';
import { getReviews } from '../../data/reviews';
import Loader from '../common/Loader';

export default ({ showUser, user }) => {
  const loadReviews = () => {
    const promise = next ? getReviews(user, next) : getReviews(user)
    promise
      .then(res => {
        const data = next ? [...reviews, ...res.reviews] : res.reviews
        setReviews(data)
        setNext(res.next)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => loadReviews(), [])

  const [reviews, setReviews] = useState([])
  const [next, setNext] = useState(null)

  const renderItem = ({ item }) => <ReviewCard showUser={showUser} review={item} />

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
  ) : (<Loader />)
};

const styles = StyleSheet.create({
  list: {
    padding: 10
  }
})
