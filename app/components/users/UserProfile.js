import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import UserAvatar from './UserAvatar';
import ReviewsList from '../reviews/ReviewsList';
import PopUpMenu from '../common/PopUpMenu';
import CustomButton from '../common/CustomButton';

import { getAllReviewsForOneUser } from '../../data/reviews';
import { logout, updateFollow } from '../../data/user';
import { isFollowing, isVisiting, showToast } from '../../functions';

import { API_URL } from '../../config';
import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';
import { AppContext } from '../../contexts/AppContext';

export default ({ user }) => {
  const [reviews, setReviews] = useState(null)

  const { connectedUser, setConnectedUser } = useContext(UserContext);
  const { setUpdates } = useContext(AppContext)
  
  const navigation = useNavigation();

  const handlePress = (action) => {
    updateFollow(action, user.username, connectedUser.token)
      .then(res => {
        if (res instanceof Error) {
          throw res
        } 
        setConnectedUser({ ...connectedUser, ...res.updatedUser })
        setUpdates(true)
      })
      .catch(err => {
        showToast(err.message)
      })
  }

  let button, popUpMenuTrigger, popUpMenuOptions;
  
  if (connectedUser && isVisiting(connectedUser, user)) {
    let action, text, color;

    if (isFollowing(connectedUser, user)) {
      action = 'unfollow';
      text = 'Suivi';
      color = colors.green;
    } else {
      action = 'follow';
      text = 'Suivre';
      color = colors.secondary;
    }

    button = (
      <CustomButton 
        text={text} 
        color={color} 
        onPress={() => handlePress(action)} />
    )

  } else if (connectedUser) {
    popUpMenuTrigger = { icon: 'dots-horizontal' }
    popUpMenuOptions = [
      { 
        icon: 'account-remove', 
        text: 'Déconnexion', 
        onSelect: () => logout(setConnectedUser) 
      },
      { 
        icon: 'account-edit', 
        text: 'Modifier mes informations', 
        onSelect: () => navigation.navigate('AccountForm', { user: connectedUser })
      }
    ]

    button = (
      <PopUpMenu 
        trigger={popUpMenuTrigger}
        options={popUpMenuOptions} />
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
          {button}
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
