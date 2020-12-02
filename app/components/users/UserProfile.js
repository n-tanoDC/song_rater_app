import React, { useState } from 'react';

import ReviewsList from '../reviews/ReviewsList';
import MessageView from '../common/MessageView';
import CustomTabView from './CustomTabView';
import UserHeader from './UserHeader';

import { getAllReviewsForOneUser } from '../../data/reviews';

const getSections = (reviews, setReviews, user) => ([
  { 
    title: 'Critiques',
    icon: 'comment',
    render: () => (
      <ReviewsList 
        getReviews={getAllReviewsForOneUser}
        object={user} 
        padder 
        reviews={reviews}
        setReviews={setReviews} />)  
  },
  {
    title: 'Favoris',
    icon: 'heart',
    render: () => (<MessageView message='Indisponible pour le moment.' />)
  },
  {
    title: 'Listes',
    icon: 'format-list-bulleted',
    render: () => (<MessageView message='Indisponible pour le moment.' />)
  },
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