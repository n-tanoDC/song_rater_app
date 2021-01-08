import React, { useContext, useState } from 'react';
import { View, StatusBar} from 'react-native';

import ReviewsList from '../reviews/ReviewsList';
import CustomTabView from '../common/CustomTabView';
import { ScrollingContainer } from '../common/Layout';
import LastReleasesSection from './LastReleasesSection';
import RecommendationsSection from './RecommendationsSection';

import { getAllFollowingReviews, getAllReviews } from '../../functions/reviews';

import { UserContext } from '../../contexts/UserContext';

const getSections = (params) => ([
  { 
    key: 'all',
    title: 'Toutes les critiques',
    render: (
      <ReviewsList 
        regular
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
        regular
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
      regular
      reviews={allReviews}
      setReviews={setAllReviews}
      getReviews={getAllReviews} />
  )

  return (
    <ScrollingContainer>
      <StatusBar barStyle='light-content' />
      <View style={{ height: 200, overflow: 'hidden' }}>
        <LastReleasesSection />
      </View>
      {connectedUser ? 
        <View style={{ height: 'auto' }}>
          <RecommendationsSection />
        </View> : null}
      <View style={{ height: 'auto' }}>
        {connectedUser ? <CustomTabView style='rounded' sections={getSections(tabViewParams)} /> : allReviewsList}
      </View>
    </ScrollingContainer>
  )
};