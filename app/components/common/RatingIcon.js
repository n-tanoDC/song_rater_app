import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ rating }) => {
  return (
    <View style={styles.ratingWrapper}>
      <Text style={styles.rating}>{rating}</Text>
      <Icon name='star' color='#FFB906' size={24}/>
    </View>
  )
};

const styles = StyleSheet.create({
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5
  },
})
