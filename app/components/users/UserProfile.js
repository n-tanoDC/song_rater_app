import React, { useState } from 'react';

import ReviewsList from '../reviews/ReviewsList';
import CustomTabView from '../common/CustomTabView';
import UserHeader from './UserHeader';
import FavSection from './FavSection';

import { getAllReviewsForOneUser } from '../../functions/reviews';

const getSections = (reviews, setReviews, user) => ([
  { 
    key: 'reviews',
    title: 'Critiques',
    icon: 'comment',
    render: (
      <ReviewsList 
        getReviews={getAllReviewsForOneUser}
        object={user} 
        padder 
        reviews={reviews}
        setReviews={setReviews} />)  
  },
  {
    key: 'favorites',
    title: 'Favoris',
    icon: 'heart',
    render: (<FavSection favorites={user.favorites} />)
  }
])

export default ({ user }) => {
  const [reviews, setReviews] = useState(null);

  return (
    <>
      <UserHeader user={user}/>
      <CustomTabView 
        sections={getSections(reviews, setReviews, user)}
        style='icon-only'
        />
    </>
  )
}