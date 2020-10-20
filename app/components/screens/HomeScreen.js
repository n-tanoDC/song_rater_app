import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../../AppContext';
import CustomSegment from '../common/CustomSegment';

import ReviewsList from '../reviews/ReviewsList';

export default () => {
  const [selected, setSelected] = useState(0);
  const { user } = useContext(AppContext);
  let segmentedControl;

  if (user) {
    segmentedControl = (
      <CustomSegment data={['Toutes', 'Abonnements']} state={{ selected, setSelected }} />
    )
  }

  console.log(selected);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Critiques</Text>
      </View>
      <View style={styles.content}>
        {segmentedControl}
        <ReviewsList showFollowsOnly={selected} showUser />
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