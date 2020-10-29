import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';

import CustomSegment from '../common/CustomSegment';
import ReviewsList from '../reviews/ReviewsList';

import { UserContext } from '../../contexts/UserContext';
import { getAllReviews } from '../../data/reviews';
import colors from '../../styles/colors';

export default () => {
  const [selected, setSelected] = useState(0);
  const { connectedUser } = useContext(UserContext);
  let segmentedControl;

  if (connectedUser) {
    segmentedControl = (
      <CustomSegment data={['Toutes les critiques', 'Abonnements']} index={selected} callback={setSelected} />
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SongRater</Text>
        <Image source={require('../../assets/images/logo1.png')} style={styles.headerLogo} />
      </View>
      <View style={styles.content}>
        {segmentedControl}
        <ReviewsList showFollowsOnly={selected} getReviews={getAllReviews} />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    borderBottomWidth: 1,
    marginBottom: 10,
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
    height: 40, width: 40
  },
  content: {
    height: '90%'
  }
})