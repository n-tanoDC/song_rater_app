import React, { useContext } from 'react';
import { View, StatusBar} from 'react-native';

import CustomTabView from '../common/CustomTabView';
import { Container, ScrollingContainer } from '../common/Layout';
import LastReleasesSection from './LastReleasesSection';
import RecommendationsSection from './RecommendationsSection';


import { UserContext } from '../../contexts/UserContext';
import RandomReviewsSection from './RandomReviewsSection';

export default () => {

  const { connectedUser } = useContext(UserContext);

  return (
    <Container>
      <StatusBar barStyle='light-content' />
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <LastReleasesSection />
      </View>
        <View style={{ height: 'auto' }}>
          <RecommendationsSection />
        </View>
      <View style={{ height: 'auto' }}>
        <RandomReviewsSection />
      </View>
    </Container>
  )
};