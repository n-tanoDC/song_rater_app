import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { getReviews } from '../../data/reviews';
import ReviewCard from './ReviewCard';

export default ({ showUser }) => {
  const loadData = () => {
    const promise = next ? getReviews(next) : getReviews()
    promise
      .then(res => {
        const data = next ? [...reviews, ...res.reviews] : res.reviews
        setReviews(data)
        setNext(res.next)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => loadData(), [])

  const [reviews, setReviews] = useState(null)
  const [next, setNext] = useState(null)

  const renderItem = ({ item }) => <ReviewCard showUser={showUser} review={item} />

  const onEndReached = () => next ? loadData() : null;
  
  return (
    <FlatList
      style={styles.list}
      data={reviews}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      onEndReached={() => onEndReached()}
      onEndReachedThreshold={0.5}
    />
  )
};

const styles = StyleSheet.create({
  list: {
    padding: 10
  }
})
