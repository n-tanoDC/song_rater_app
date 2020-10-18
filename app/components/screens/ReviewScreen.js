import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { AppContext } from '../../AppContext';
import Loader from '../common/Loader';
import ReviewHeader from '../common/ReviewHeader';
import ReviewDisplay from '../reviews/ReviewDisplay';
import ReviewForm from '../reviews/ReviewForm';

export default ({ route }) => {
  const { reviewToShow = null, element = null } = route.params;
  const [review, setReview] = useState(reviewToShow);
  
  useEffect(() => setReview(reviewToShow), [reviewToShow])
  
  const { user } = useContext(AppContext);

  let content;

  if (!review) {
    content = (<ReviewForm setReview={setReview} element={element} user={user} />)
  } else {
    content = (<ReviewDisplay review={review} />)
  }
    
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ReviewHeader user={review ? review.author : user} form={!review} element={review ? review.element : element} />
      {content}
    </SafeAreaView>
  )
};
