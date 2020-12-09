import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';

import ReviewsList from './reviews/ReviewsList';
import CustomTabView from './common/CustomTabView';

import { getAllFollowingReviews, getAllReviews } from '../functions/reviews';

import { UserContext } from '../contexts/UserContext';

const getSections = (params) => ([
  { 
    key: 'all',
    title: 'Toutes les critiques',
    render: (
      <ReviewsList 
        reviews={params.allReviews}
        setReviews={params.setAllReviews}
        getReviews={params.getAllReviews} />
    )
  },
  { 
    key: 'subscriptions',
    title: 'Abonnements',
    render: (
      <ReviewsList 
        object={params.connectedUser}
        reviews={params.subscriptionsReviews}
        setReviews={params.setSubscriptionsReviews}
        getReviews={params.getAllFollowingReviews} />
    )
  }
])

export default () => {
  const [allReviews, setAllReviews] = useState(null);
  const [subscriptionsReviews, setSubscriptionsReviews] = useState(null);

  const { connectedUser } = useContext(UserContext);

  const tabViewParams = {
    allReviews, setAllReviews, getAllReviews,
    subscriptionsReviews, setSubscriptionsReviews, getAllFollowingReviews,
    connectedUser
  }

  const allReviewsList = (
    <ReviewsList 
      reviews={allReviews}
      setReviews={setAllReviews}
      getReviews={getAllReviews} />
  )

  return (
    <SafeAreaView style={styles.container}>
      {connectedUser ? <CustomTabView style='rounded' sections={getSections(tabViewParams)} /> : allReviewsList}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})