import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import ReviewCard from './ReviewCard';
import Loader from '../common/Loader';
import MessageView from '../common/MessageView';

import { accountDeleted, getAverageRating } from '../../functions';

import { UserContext } from '../../contexts/UserContext';
import { AppContext } from '../../contexts/AppContext';

export default (props) => {
  const {
    getReviews, 
    hideMedia,
    object, 
    setRating, 
    showFollowsOnly,
    listHeader,
    padder,
  } = props;

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
    // set page to 1 if we are not loading a new page or if there are any updates
    const page = !nextPage || updates ? 1 : nextPage;
    getReviews(page, object)
      .then(res => {
        let allReviews;

        // Add response to existing reviews, if we are loading a new page and if there's no updates
        if (nextPage && !updates) {
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
              !accountDeleted(review.author) && review.author._id === userId))
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

  const renderItem = ({ item }) => (
    <View style={{ paddingHorizontal: padder ? 10 : 0 }}>
      <ReviewCard hideMedia={hideMedia} showUser review={item} />
    </View>
  )

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

  const refreshControl = <RefreshControl refreshing={isRefreshing} onRefresh={() => loadReviews()} />
  
  return (
    <FlatList
      ListHeaderComponent={listHeader}
      ListEmptyComponent={() => <MessageView message='Aucune critique' />}
      refreshControl={refreshControl}
      data={reviews}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      onEndReached={() => onEndReached()}
      onEndReachedThreshold={0.5} />
  )
};