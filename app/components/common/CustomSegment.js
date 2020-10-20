import SegmentedControl from '@react-native-community/segmented-control';
import React from 'react';

export default ({ data, index, callback }) => {
  
  const handleChange = value => {
    const index = data.findIndex(item => value === item)
    callback(index)
  }

  return (
    <SegmentedControl
      values={data}
      selectedIndex={index}
      onValueChange={value => handleChange(value)}
      style={{ backgroundColor: '#C4C4C4', margin: 10 }}
      tintColor='#9E00FF'
    />
  )
};
