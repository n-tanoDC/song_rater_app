import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';

import CustomSegment from '../common/CustomSegment';
import ReviewsList from '../reviews/ReviewsList';

import { UserContext } from '../../contexts/UserContext';
import { getAllFollowingReviews, getAllReviews } from '../../data/reviews';
import colors from '../../styles/colors';

export default () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allReviews, setAllReviews] = useState(null);
  const [followingReviews, setFollowingReviews] = useState(null);

  const { connectedUser } = useContext(UserContext);

  let segmentedControl, followingReviewsList;

  let allReviewsList = (
    <ReviewsList 
      reviews={allReviews}
      setReviews={setAllReviews}
      getReviews={getAllReviews} />
  )
  
  if (connectedUser) {
    segmentedControl = (
      <CustomSegment 
        data={['Toutes les critiques', 'Abonnements']}
        index={selectedIndex}
        callback={setSelectedIndex} />
    );
    followingReviewsList = (
      <ReviewsList
        object={connectedUser}
        reviews={followingReviews}
        setReviews={setFollowingReviews}
        getReviews={getAllFollowingReviews} />
    )
  }
  
  const reviewSection = selectedIndex ? followingReviewsList : allReviewsList;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SongRater</Text>
        <Image source={require('../../assets/images/logo1.png')} style={styles.headerLogo} />
      </View>
      <View style={styles.content}>
        {segmentedControl}
        {reviewSection}
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '10%'
  },
  headerTitle: {
    fontFamily: 'baloo2-semibold',
    fontSize: 28,
    color: colors.darkgrey,
  },
  headerLogo: {
    height: 40,
    width: 40
  },
  content: {
    flex: 1
  }
})