import { List } from 'native-base';
import React from 'react';
import ReviewCard from './ReviewCard';

export default ({ navigation, reviews, size }) => {
  const jsxReviews = reviews.map((review, key) => <ReviewCard key={key} navigation={navigation} size={size} review={review}/>)
  return (
    <List>
      {jsxReviews}
    </List>
  )
};
