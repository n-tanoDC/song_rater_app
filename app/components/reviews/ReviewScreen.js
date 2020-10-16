import React, { useContext, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { UserContext } from '../../App';
import ReviewHeader from '../common/ReviewHeader';
import ReviewForm from './ReviewForm';

export default ({ route }) => {
  const { element } = route.params;
  const { user } = useContext(UserContext);

  console.log(review);

  const [review, setReview] = useState(null)

  const content = !review ? 
    <ReviewForm setReview={setReview} element={element} user={user} /> :
    <View>
      <Text>{review.title}</Text>
      <Text>{review.content}</Text>
    </View>
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ReviewHeader user={review ? review.author : user} element={element} />
      {content}
    </SafeAreaView>
  )
};
