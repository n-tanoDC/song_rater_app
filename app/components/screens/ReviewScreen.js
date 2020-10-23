import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

import ReviewHeader from '../common/ReviewHeader';
import ReviewDisplay from '../reviews/ReviewDisplay';
import ReviewForm from '../reviews/ReviewForm';

import { UserContext } from '../../contexts/UserContext';

export default ({ route }) => {
  const { reviewToShow = null, media = null } = route.params;
  const [review, setReview] = useState(reviewToShow);

  
  useEffect(() => setReview(reviewToShow), [reviewToShow, media])
  
  const { connectedUser } = useContext(UserContext);

  let content = (<ReviewDisplay review={review} />);
 
  if (!review) {
    content = (<ReviewForm setReview={setReview} media={media} user={connectedUser} />);
  }
    
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ReviewHeader user={review ? review.author : connectedUser} rating={review ? review.rating : null} media={review ? review.media : media} />
      {content}
    </SafeAreaView>
  )
};
