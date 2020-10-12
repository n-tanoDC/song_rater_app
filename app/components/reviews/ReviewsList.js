import { List, ListItem } from 'native-base';
import React from 'react';
import ReviewCard from './ReviewCard';

export default ({ showUser, reviews }) => {
  const jsxReviews = reviews.map((review, key) => <ReviewCard key={key} showUser={showUser} review={review}/>)
  return (
    <List>
      {jsxReviews}
    </List>
  )
};
