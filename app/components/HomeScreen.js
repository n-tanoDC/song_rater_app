import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';

import ReviewsList from './reviews/ReviewsList';
import CustomTabView from './common/CustomTabView';

import { getAllFollowingReviews, getAllReviews } from '../functions/reviews';

import { UserContext } from '../contexts/UserContext';

const getReviewsList = (params) => (
  <ReviewsList 
    object={params.object}
    reviews={params.reviews}
    setReviews={params.setReviews}
    getReviews={params.getReviews} />
)

const getSections = (params) => ([
  { 
    title: 'Toutes les critiques',
    render: () => getReviewsList({
      reviews: params.allReviews,
      setReviews: params.setAllReviews,
      getReviews: params.getAllReviews
    }),
  },
  { 
    title: 'Abonnements',
    render: () => getReviewsList({
      reviews: params.subscriptionsReviews,
      setReviews: params.setSubscriptionsReviews,
      getReviews: params.getAllFollowingReviews,
      object: params.connectedUser
    }),
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

  const allReviewsList = getReviewsList({
    reviews: allReviews,
    setReviews: setAllReviews,
    getReviews: getAllReviews
  })

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