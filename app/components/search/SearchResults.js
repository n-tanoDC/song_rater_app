import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';

import ResultCard from './ResultCard';

import { catchErrors } from '../../functions/errors';
import { loadNextResults } from '../../functions/spotify';

import { AppContext } from '../../contexts/AppContext';

export default (props) => {  

  const [results, setResults] = useState(props.results.items)
  const [nextPageUrl, setNextPageUrl] = useState(props.results.next)

  const { token } = useContext(AppContext);

  const renderItem = ({ item }) => {
    return (<ResultCard result={item} />)
  }

  const onEndReached = () => {
    if (nextPageUrl) {
      loadNextResults(nextPageUrl, token)
        .then(res => {
          if (res) {
            const newResults = res[Object.keys(res)[0]].items;
            setResults([...results, ...newResults])
            setNextPageUrl(res.next)
          }
        })
        .catch(catchErrors)
    }
  }

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
  