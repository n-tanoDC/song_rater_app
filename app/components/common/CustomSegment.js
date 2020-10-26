import SegmentedControl from '@react-native-community/segmented-control';
import React from 'react';
import { StyleSheet } from 'react-native';

export default ({ data, index, callback }) => {
  
  const handleChange = value => {
    const index = data.findIndex(item => value === item)
    callback(index)
  }

  return (
    <SegmentedControl
      values={data}
      style={styles.container}
      fontStyle={styles.inactive}
      activeFontStyle={styles.active}
      selectedIndex={index}
      onValueChange={value => handleChange(value)}
      tintColor='#9E00FF'
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
    backgroundColor: '#C4C4C4', 
    margin: 10,
  },
})
