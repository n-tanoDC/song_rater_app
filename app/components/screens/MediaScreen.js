import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import ReviewsList from '../reviews/ReviewsList';

import { getAllReviewsForOneMedia } from '../../data/reviews';
import MediaBanner from '../media/MediaBanner';

export default ({ route }) => {
  const { media } = route.params;

  const [reviews, setReviews] = useState(null)
  const [rating, setRating] = useState(null)

  return (
    <SafeAreaView>
      <ReviewsList 
        getReviews={getAllReviewsForOneMedia}
        reviews={reviews}
        setReviews={setReviews}
        hideMedia
        listHeader={<MediaBanner media={media} rating={rating} />} 
        object={media} 
        padder
        setRating={setRating} />
    </SafeAreaView>
  )
};
