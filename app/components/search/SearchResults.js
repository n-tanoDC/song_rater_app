import React from 'react';
import { FlatList } from 'react-native';

import ResultCard from './ResultCard';

export default ({ results }) => {
    
  const renderItem = ({ item }) => <ResultCard result={item} />

  const onEndReached = () => console.log('end reached');

  return (
    <FlatList
      style={{ marginTop: 20, width: '100%' }}
      data={results.items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onEndReached={() => onEndReached()}
      onEndReachedThreshold={0.5}
    />
  )
};
  