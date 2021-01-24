import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import ReviewCard from './ReviewCard';
import Loader from '../common/Loader';
import MessageView from '../common/MessageView';

import { getAverageRating } from '../../functions/helpers';

import { AppContext } from '../../contexts/AppContext';

export default (props) => {
  const {
    sortValue,
    reviews,
    setReviews,
    getReviews,
    hideMedia,
    object, 
    setRating, 
    listHeader,
    regular
  } = props;

  const [nextPage, setNextPage] = useState(null);
  const [isRefreshing, setRefresh] = useState(false);

  // Load reviews when there has been updates
  useEffect(() => { if (updates || !reviews) loadReviews() })
  useEffect(() => { loadReviews() }, [sortValue, getReviews])

  const { updates, setUpdates } = useContext(AppContext);

  const loadReviews = () => {
    // set page to 1 if we are not loading a new page or if there are any updates
    const page = !nextPage || updates ? 1 : nextPage;

    getReviews(page, sortValue, object)
      .then(res => {
        if (res.reviews) {
          let allReviews;
  
          // Add response to existing reviews, if we are loading a new page and if there's no updates
          if (reviews && nextPage && !updates) {
            allReviews = reviews.concat(res.reviews);
          } else {
            allReviews = res.reviews
          }
  
          // Filter to only display reviews with a title and a content
          let filteredReviews = allReviews.filter(review => review.content && review.title)
  
          // Get the average rating of all reviews, if setRating is provided as a prop
          if (setRating) {
            setRating(getAverageRating(allReviews));
          }
  
          setReviews(filteredReviews);
          setNextPage(res.next);
        } else {
          setReviews([]);
        }
        setRefresh(false)
        setUpdates(false)
      })
      .catch(err => console.log(err))
  }

  // Return a loader while the app loads the data
  if (!reviews) return <Loader />

  if (regular) {
    if (!reviews.length) return (<MessageView message='Aucune critique' />)
    const jsxReviews = reviews.map(review => (
      <ReviewCard
        key={review._id}
        hideMedia={hideMedia}
        showUser
        review={review} />
    ))
    return jsxReviews
  }

  // Component to render for each list item
  const renderItem = ({ item }) => (
    <ReviewCard
      hideMedia={hideMedia}
      showUser
      review={item} />
  )

  // When the end of the list is reached, load the next page of reviews if there is one.
  const onEndReached = () => {
    if (nextPage) {
      loadReviews()
    }
  }

  const refreshControl = (
    <RefreshControl 
      refreshing={isRefreshing} 
      onRefresh={() => loadReviews()} />
  )
  
  return (
    <FlatList
      data={reviews}
      keyExtractor={review => review._id}
      ListEmptyComponent={() => <MessageView message='Aucune critique' />}
      ListHeaderComponent={listHeader}
      onEndReached={() => onEndReached()}
      onEndReachedThreshold={0.5} 
      refreshControl={refreshControl}
      renderItem={renderItem} />
  )
};