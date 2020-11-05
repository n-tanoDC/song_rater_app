import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

import UserAvatar from './UserAvatar';
import ReviewsList from '../reviews/ReviewsList';
import PopMenu from '../common/PopMenu';
import CustomButton from '../common/CustomButton';

import { API_URL } from '../../config';
import { isFollowing, showToast } from '../../functions';
import { getOptions } from '../../data/helpers';

import { UserContext } from '../../contexts/UserContext';
import { getAllReviewsForOneUser } from '../../data/reviews';
import colors from '../../styles/colors';

export default ({ user, visit }) => {
  const [reviews, setReviews] = useState(null)
  const { connectedUser, setConnectedUser } = useContext(UserContext);
  
  // Updating following status
  const updateFollow = (action) => {
    fetch(API_URL + 'users/' + user.username + '/' + action, getOptions(null, connectedUser.token, 'GET'))
    .then(res => { 
      if (res.status === 200) {

        // Store the whole array in a variable
        const updatedFollowing = connectedUser.following;

        switch (action) {
          case 'follow':
            // Push the followed user in the array
            updatedFollowing.push(user._id);
            break;
          case 'unfollow':
            // Find the index of the user to unfollow
            const index = connectedUser.following.findIndex(userId => userId === user._id);
            // Remove the user to unfollow from the array
            updatedFollowing.splice(index, 1);
            break;
          default:
            throw new Error('Action not supported')
          }

        // Update the user context with the new array
        setConnectedUser({...connectedUser, following: updatedFollowing})
      } else {
        throw new Error(res.status)
      }
    })  
    .catch(err => {
      // show generic error message if there's an error
      showToast();
      console.log(err);
    })
  }

  let followButton;
  
  // Show follow button only if a user is connected
  // Change color, text and action depending on following status
  if (connectedUser) {
    const following = isFollowing(connectedUser, user);
    const action = following ? 'unfollow' : 'follow';

    followButton = (
      <CustomButton 
        text={following ? 'Suivi' : 'Suivre'} 
        color={following ? colors.green : colors.secondary} 
        onPress={() => updateFollow(action)} />
    )
  }

  return (
    <>
      <View style={styles.header}>
        <ImageBackground
          blurRadius={20}
          style={styles.headerBackground}
          source={{ uri: API_URL + 'uploads/' + user.avatar }}>
        <UserAvatar user={user} />
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.buttonContainer}>
          {!visit ? <PopMenu /> : followButton}
        </View>
        </ImageBackground>
      </View>
      <View style={styles.content}>
        <ReviewsList 
          getReviews={getAllReviewsForOneUser}
          object={user} 
          padder 
          reviews={reviews}
          setReviews={setReviews} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    height: '30%',
  },
  headerBackground: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  username: {
    marginTop: 10,
    fontFamily: 'baloo2-semibold',
    fontSize: 18,
    color: colors.white,
    textShadowColor: colors.darkgrey,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  content: {
    height: '70%'
  },
})
