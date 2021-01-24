import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CustomButton from '../common/buttons/CustomButton';

import colors from '../../styles/colors';
import { catchErrors } from '../../functions/errors';
import { updateReviewVote } from '../../functions/reviews';
import { showToast } from '../../functions/helpers';

import { UserContext } from '../../contexts/UserContext';

export default ({ review, setReview }) => {
  const { upvotes, downvotes } = review;

  const [userVote, setUserVote] = useState(null)
  const [averageVote, setAverageVote] = useState(review.averageVote)

  const { connectedUser } = useContext(UserContext)
  
  useEffect(() => {
    if (connectedUser) {
      if (upvotes.includes(connectedUser._id)) {
        setUserVote('upvote')
      } else if (downvotes.includes(connectedUser._id)) {
        setUserVote('downvote')
      } else {
        setUserVote(null)
      }
    }
  }, [review])

  const handleVote = (type) => {
    if (connectedUser) {
      updateReviewVote(type, review, connectedUser.token)
        .then(res => {
          if (res) {
            const newReview = { 
              ...review, 
              upvotes: res.upvotes,
              downvotes: res.downvotes,
              averageVote: res.averageVote
            };
            setReview(newReview);
            setUserVote(userVote === type ? null : type)
            setAverageVote(newReview.averageVote)
          }
        })
        .catch(catchErrors)
    } else {
      showToast('Veuillez vous connecter pour noter une critique.')
    }
  }

  return (
    <View style={styles.votingSection}>
      <CustomButton
        color={userVote === 'upvote' ? colors.green : colors.grey} 
        icon='thumb-up'
        onPress={() => handleVote('upvote')} 
        transparent />
      <Text style={styles.totalVotes}>{averageVote}</Text>
      <CustomButton 
        color={userVote === 'downvote' ? colors.red : colors.grey} 
        icon='thumb-down'
        onPress={() => handleVote('downvote')} 
        transparent />
    </View>
  )
};

const styles = StyleSheet.create({
  votingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalVotes: {
    fontFamily: 'baloo2-semibold'
  }
})
