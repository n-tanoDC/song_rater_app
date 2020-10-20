import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

import ReviewHeader from '../common/ReviewHeader';
import ReviewDisplay from '../reviews/ReviewDisplay';
import ReviewForm from '../reviews/ReviewForm';

import { UserContext } from '../../contexts/UserContext';

export default ({ route }) => {
  const { reviewToShow = null, element = null } = route.params;
  const [review, setReview] = useState(reviewToShow);
  
  useEffect(() => setReview(reviewToShow), [reviewToShow])
  
  const { connectedUser } = useContext(UserContext);

  let content;

  if (!review) {
    content = (<ReviewForm setReview={setReview} element={element} user={connectedUser} />)
  } else {
    content = (<ReviewDisplay review={review} />)
  }
    
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ReviewHeader user={review ? review.author : connectedUser} form={!review} element={review ? review.element : element} />
      {content}
    </SafeAreaView>
  )
};
