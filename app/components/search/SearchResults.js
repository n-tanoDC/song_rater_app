import React from 'react';
import { FlatList } from 'react-native';

import ResultCard from './ResultCard';

export default ({ results, onEndReached }) => {  

  const renderItem = ({ item }) => <ResultCard result={item} />

  return (
    <FlatList
      style={{ marginTop: 20, width: '100%' }}
      data={results}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onEndReached={() => onEndReached()}
      onEndReachedThreshold={2}
    />
  )
};
  