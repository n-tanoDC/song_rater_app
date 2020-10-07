import { List } from 'native-base';
import React from 'react';
import ReviewCard from './ReviewCard';

export default ({ reviews }) => {
  const jsxReviews = reviews.map((review, key) => <ReviewCard key={key} review={review}/>)
  return (
    <List>
      {jsxReviews}
    </List>
  )
};
