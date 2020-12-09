import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

import ReviewHeader from './ReviewHeader';
import ReviewDisplay from './ReviewDisplay';
import ReviewForm from './ReviewForm';

import { UserContext } from '../../contexts/UserContext';
import { accountDeleted } from '../../functions/helpers';

export default ({ route }) => {
  const { reviewToShow = null, media = null } = route.params;
  const [review, setReview] = useState(reviewToShow);
  
  useEffect(() => setReview(reviewToShow), [reviewToShow, media])
  
  const { connectedUser } = useContext(UserContext);

  let content, userProp;
 
  if (review) {
    content = (<ReviewDisplay review={review} />);
    userProp = accountDeleted(review.author) ? { username: 'Utilisateur supprimé' } : review.author;
  } else {
    userProp = connectedUser;
    content = (
      <ReviewForm 
        setReview={setReview} 
        media={media} 
        user={connectedUser} />)
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ReviewHeader 
        user={userProp} 
        rating={review ? review.rating : null} 
        media={review ? review.media : media} />
      {content}
    </SafeAreaView>
  )
};
