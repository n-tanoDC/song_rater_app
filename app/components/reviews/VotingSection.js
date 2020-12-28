import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CustomButton from '../common/buttons/CustomButton';

import colors from '../../styles/colors';
import { catchErrors } from '../../functions/errors';
import { updateReviewVote } from '../../functions/reviews';

import { UserContext } from '../../contexts/UserContext';
import { AppContext } from '../../contexts/AppContext';

export default ({ review }) => {
  const [upvotes, setUpvotes] = useState(review.upvotes)
  const [downvotes, setDownvotes] = useState(review.downvotes)
  const [userVote, setUserVote] = useState(null)

  const { connectedUser } = useContext(UserContext)
  const { setUpdates } = useContext(AppContext)
  
  useEffect(() => {
    if (connectedUser) {
      const userUpvote = upvotes.includes(connectedUser._id);
      const userDownvote = downvotes.includes(connectedUser._id);
      if (userUpvote) {
        setUserVote('upvote')
      } else if (userDownvote) {
        setUserVote('downvote')
      } else {
        setUserVote(null)
      }
    }
  }, [upvotes, downvotes])

  const handleVote = (type) => {
    updateReviewVote(type, review, connectedUser.token)
      .then(res => {
        if (res) {
          setUpvotes(res.upvotes)
          setDownvotes(res.downvotes)
          setUpdates(true)
        }
      })
      .catch(catchErrors)
  }

  if (connectedUser) {
    return (
      <View style={styles.votingSection}>
        <CustomButton
          color={userVote === 'upvote' ? colors.green : colors.grey} 
          icon='thumb-up'
          large 
          onPress={() => handleVote('upvote')} 
          text={upvotes.length ? upvotes.length : '0'} 
          transparent />
        <CustomButton 
          color={userVote === 'downvote' ? colors.red : colors.grey} 
          icon='thumb-down'
          large 
          onPress={() => handleVote('downvote')} 
          text={downvotes.length ? downvotes.length : '0'} 
          transparent />
      </View>
    )
  }

  return null;
};

const styles = StyleSheet.create({
  votingSection: {
    flexDirection: 'row',
    paddingVertical: 10
  }
})
