import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import { UserContext } from '../../App';
import Loader from '../common/Loader';
import ReviewHeader from '../common/ReviewHeader';
import ReviewDisplay from './ReviewDisplay';
import ReviewForm from './ReviewForm';

export default ({ route }) => {
  const { reviewToShow = null, element = null } = route.params;
  const [review, setReview] = useState(reviewToShow);

  const { user } = useContext(UserContext);

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
