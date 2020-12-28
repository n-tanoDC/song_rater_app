import React, { useState } from 'react';

import ReviewsList from '../reviews/ReviewsList';

import { getAllReviewsForOneMedia } from '../../functions/reviews';
import MediaBanner from './MediaBanner';
import { Container } from '../common/Layout';

export default ({ route }) => {
  const { media } = route.params;

  const [reviews, setReviews] = useState(null)
  const [rating, setRating] = useState(null)
  
  return (
    <Container>
      <ReviewsList 
        getReviews={getAllReviewsForOneMedia}
        reviews={reviews}
        setReviews={setReviews}
        hideMedia
        listHeader={<MediaBanner media={media} rating={rating} />} 
        object={media} 
        padder
        setRating={setRating} />
    </Container>
  )
};
