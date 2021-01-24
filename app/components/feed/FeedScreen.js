import React, { useContext, useState } from 'react';

import FeedHeader from './FeedHeader';
import ReviewsList from '../reviews/ReviewsList';
import { Container } from '../common/Layout';

import { getAllFollowingReviews, getAllReviews } from '../../functions/reviews';

import { UserContext } from '../../contexts/UserContext';

export default () => {
  const [reviews, setReviews] = useState(null);
  const [sortValue, setSortValue] = useState('created_at');
  const [subsciptionsOnly, setSubscriptionsOnly] = useState(false);

  const { connectedUser } = useContext(UserContext);

  return (
    <Container>
      <FeedHeader
        sortValue={sortValue} 
        setSortValue={setSortValue} 
        subsciptionsOnly={subsciptionsOnly}
        setSubscriptionsOnly={setSubscriptionsOnly} />
      <ReviewsList
        sortValue={sortValue}
        reviews={reviews}
        object={connectedUser}
        setReviews={setReviews}
        getReviews={subsciptionsOnly ? getAllFollowingReviews : getAllReviews} />
    </Container>
  )
};