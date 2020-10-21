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
        <Text>Critiques</Text>
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
    backgroundColor: '#FDFDFD'
  },
  header: {
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    padding: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '10%'
  },
  content: {
    height: '90%'
  }
})