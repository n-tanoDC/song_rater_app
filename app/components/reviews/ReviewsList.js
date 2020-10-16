import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import ReviewCard from './ReviewCard';
import { getReviews } from '../../data/reviews';

export default ({ showUser, user }) => {
  const loadData = () => {
    const promise = next ? getReviews(user, next) : getReviews(user)
    promise
      .then(res => {
        const data = next ? [...reviews, ...res.reviews] : res.reviews
        setReviews(data)
        setNext(res.next)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => loadData(), [])

  const [reviews, setReviews] = useState([])
  const [next, setNext] = useState(null)

  const renderItem = ({ item }) => <ReviewCard showUser={showUser} review={item} />

  const onEndReached = () => next ? loadData() : null;
  
  return reviews.length > 0 ? (
    <FlatList
      style={styles.list}
      data={reviews}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      onEndReached={() => onEndReached()}
      onEndReachedThreshold={0.5}
    />
  ) : (<Text>Aucune critique.</Text>)
};

const styles = StyleSheet.create({
  list: {
    padding: 10
  }
})
