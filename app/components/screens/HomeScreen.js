import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';

import CustomSegment from '../common/CustomSegment';
import ReviewsList from '../reviews/ReviewsList';

import { UserContext } from '../../contexts/UserContext';
import { getAllReviews } from '../../data/reviews';

export default () => {
  const [selected, setSelected] = useState(0);
  const { connectedUser } = useContext(UserContext);
  let segmentedControl;

  if (connectedUser) {
    segmentedControl = (
      <CustomSegment data={['Toutes', 'Abonnements']} index={selected} callback={setSelected} />
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Critiques</Text>
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
    height: '10%'
  },
  headerTitle: {
    fontFamily: 'baloo2-semibold',
    fontSize: 28,
    color: '#3A3A3A',
  },
  content: {
    height: '90%'
  }
})