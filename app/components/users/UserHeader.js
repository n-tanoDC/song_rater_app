import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import UserAvatar from './UserAvatar';
import PopUpMenu from '../common/PopUpMenu';
import FollowButton from '../common/buttons/FollowButton';

import { logout } from '../../functions/user';
import { isVisiting } from '../../functions/helpers';

import { API_URL } from '../../config.local';
import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';

export default ({ user }) => {
  const [optionsButton, setOptionsButton] = useState(<View></View>)
  const [followButton, setFollowButton] = useState(<View></View>)

  const { connectedUser, setConnectedUser } = useContext(UserContext);
  
  const navigation = useNavigation();

  useEffect(() => {
    if (connectedUser && isVisiting(connectedUser, user)) {
      setFollowButton(<FollowButton user={user} />)
    } else if (connectedUser) {
      const popUpMenuTrigger = { icon: 'dots-horizontal' }
      const popUpMenuOptions = [
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
  
      setOptionsButton(
        <PopUpMenu 
          trigger={popUpMenuTrigger}
          options={popUpMenuOptions} />
      )
    }
  }, [user])
  
  return (
    <View style={styles.header}>
      <ImageBackground
        blurRadius={20}
        style={styles.headerBackground}
        source={{ uri: API_URL + 'uploads/' + user.avatar }}>
      <View style={styles.userSection}>
      <View style={styles.userAvatar}>
        <UserAvatar withBorder user={user} />
      </View>
      <View style={styles.actionButtons}>
        {optionsButton}
        {followButton}
      </View>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.userStats}>9999 abonné(s)</Text>
      </View>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
  },
  headerBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  userSection: {
    backgroundColor: colors.white,
    width: '100%',
    marginTop: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userAvatar: {
    top: -40,
    position: "absolute",
    borderWidth: 3,
    borderRadius: 100,
    borderColor: colors.white,
  },
  actionButtons: {
    minHeight: 48,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  username: {
    fontFamily: 'baloo2-semibold',
    fontSize: 18,
    color: colors.darkgrey,
  },
  userStats: {
    marginBottom: 5,
    fontSize: 12,
    color: colors.grey,
  }
})
