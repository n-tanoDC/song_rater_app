import SegmentedControl from '@react-native-community/segmented-control';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default ({ data, index, callback }) => {
  
  const handleChange = value => {
    const index = data.findIndex(item => value === item)
    callback(index)
  }

  return (
    <SegmentedControl
      values={data}
      backgroundColor={colors.lightgrey}
      style={styles.container}
      fontStyle={styles.inactive}
      activeFontStyle={styles.active}
      selectedIndex={index}
      onValueChange={value => handleChange(value)}
      tintColor={colors.primary}
    />
  )
};

const styles = StyleSheet.create({
  active: { 
    fontFamily: 'baloo2-semibold',
  },
  inactive: { 
    fontFamily: 'baloo2-regular',
  },
  container: {
    margin: 10,
  },
})
