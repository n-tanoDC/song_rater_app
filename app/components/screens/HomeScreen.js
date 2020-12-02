import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';

import ReviewsList from '../reviews/ReviewsList';
import CustomTabView from '../users/CustomTabView';

import { getAllFollowingReviews, getAllReviews } from '../../data/reviews';

import { UserContext } from '../../contexts/UserContext';

export default () => {
  const [allReviews, setAllReviews] = useState(null);
  const [subscriptionsReviews, setSubscriptionsReviews] = useState(null);

  const { connectedUser } = useContext(UserContext);

  const allReviewsList = (
    <ReviewsList 
      reviews={allReviews}
      setReviews={setAllReviews}
      getReviews={getAllReviews} />
  )
  
  const subscriptionsReviewsList = (
      <ReviewsList
        object={connectedUser}
        reviews={subscriptionsReviews}
        setReviews={setSubscriptionsReviews}
        getReviews={getAllFollowingReviews} />
    )

  const sections = [
    { 
      title: 'Toutes les critiques',
      render: () => allReviewsList,
    },
    { 
      title: 'Abonnements',
      render: () => subscriptionsReviewsList,
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
      {connectedUser ? <CustomTabView style='rounded' sections={sections} /> : allReviewsList}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})