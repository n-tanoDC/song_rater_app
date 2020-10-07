import SegmentedControl from '@react-native-community/segmented-control';
import React from 'react';

export default ({ data, state }) => {
  
  const handleChange = value => {
    const index = data.findIndex(item => value === item)
    state.setSelected(index)
  }

  return (
    <SegmentedControl
    values={data}
    selectedIndex={state.selected}
    onValueChange={value => handleChange(value)}
    style={{ backgroundColor: '#C4C4C4', margin: 10 }}
    tintColor='#9E00FF'
  />
  )
};
