import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import ReviewCard from './ReviewCard';
import Loader from '../common/Loader';
import MessageView from '../common/MessageView';

import { getAverageRating } from '../../functions';

import { UserContext } from '../../contexts/UserContext';
import { AppContext } from '../../contexts/AppContext';

export default ({ getReviews, object, setRating, showFollowsOnly }) => {
  const [reviews, setReviews] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [isRefreshing, setRefresh] = useState(false);

  // Load reviews on first render & when showFollowsOnly changes
  useEffect(() => loadReviews(), [showFollowsOnly])
  // Load reviews when there has been updates
  useEffect(() => { if (updates) { loadReviews() }})

  const { updates, setUpdates } = useContext(AppContext)
  const { connectedUser } = useContext(UserContext)

  const loadReviews = () => {
    getReviews(nextPage, object)
      .then(res => {
        let allReviews;

        // Add response to existing reviews, if we are loading a new page
        if (nextPage) {
          allReviews = reviews.concat(res.reviews);
        } else {
          allReviews = res.reviews
        }

        // Filter to only display reviews with a title and a content
        let filteredReviews = allReviews.filter(review => review.content && review.title)

        // Filter to only display reviews from followed users, if showFollowsOnly is true
        if (showFollowsOnly) {
          filteredReviews = filteredReviews.filter(review => 
            connectedUser.following.some(userId => 
              review.author._id === userId))
        }

        // Get the average rating of all reviews, if setRating is provided as a prop
        if (setRating) {
          setRating(getAverageRating(allReviews));
        }

        setReviews(filteredReviews)
        setNextPage(res.next)
      })
      .then(() => {
        setRefresh(false)
        setUpdates(false)
      })
      .catch(err => console.log(err))
  }

  const renderItem = ({ item }) => <ReviewCard showUser review={item} />

  // When the end of the list is reached, load the next page of reviews if there is one.
  const onEndReached = () => {
    if (nextPage) {
      loadReviews()
    }
  } 

  // show a loader while we load reviews
  if (updates || !reviews) {
    return (<Loader />)
  }
  
  if (reviews.length === 0) {
    return (<MessageView message='Aucune critique.' />)
  } 
  

  const refreshControl = <RefreshControl refreshing={isRefreshing} onRefresh={() => loadReviews()} />

  return (
    <>
      <FlatList
        refreshControl={refreshControl}
        data={reviews}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        onEndReached={() => onEndReached()}
        onEndReachedThreshold={0.5} />
    </>
  )
};