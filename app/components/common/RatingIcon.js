import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';

export default ({ rating }) => {
  return (
    <View style={styles.ratingWrapper}>
      <Text style={styles.rating}>{rating}</Text>
      <Icon name='star' color={colors.secondary} size={24}/>
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
    fontFamily: 'baloo2-semibold',
    marginRight: 5
  },
})
