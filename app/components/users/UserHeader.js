import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import UserAvatar from './UserAvatar';
import CustomImageBackground from '../common/CustomImageBackground';
import PopUpMenu from '../common/PopUpMenu';
import FollowButton from '../common/buttons/FollowButton';

import { logout } from '../../functions/user';
import { getFollowers, isVisiting } from '../../functions/helpers';

import { API_URL } from '../../config.local';
import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';

export default ({ user }) => {
  const [optionsButton, setOptionsButton] = useState(<View></View>)
  const [followButton, setFollowButton] = useState(<View></View>)
  const [followers, setFollowers] = useState(user.followers.length)

  const { connectedUser, setConnectedUser } = useContext(UserContext);
  
  const navigation = useNavigation();

  useEffect(() => {
    if (connectedUser && isVisiting(connectedUser, user)) {
      setFollowButton(<FollowButton user={user} setFollowers={setFollowers} />)
    } else if (connectedUser) {
      setOptionsButton(
        <PopUpMenu 
          trigger={{ icon: 'dots-horizontal' }}
          options={[
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
        ]} />
      )
    }
  }, [user])

  return (
    <View style={styles.header}>
      <CustomImageBackground uri={API_URL + 'uploads/' + user.avatar}>
        <View style={styles.optionsButton}>
          {optionsButton}
        </View>
        <View style={styles.followButton}>
          {followButton}
        </View>
        <View style={styles.userSection}>
          <View style={styles.userAvatar}>
            <UserAvatar withBorder user={user} />
          </View>
          <View>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.userStats}>{getFollowers(followers)}</Text>
          </View>
        </View>
      </CustomImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    height: '25%'
  },
  headerBackground: {
    justifyContent: 'center',
    padding: 15
  },
  optionsButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
  },
  followButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  userSection: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    textAlign: 'center',
    borderWidth: 2,
    marginBottom: 5,
    borderRadius: 100,
    borderColor: colors.white,
  },
  username: {
    textAlign: 'center',
    fontFamily: 'baloo2-semibold',
    fontSize: 18,
    color: colors.white,
  },
  userStats: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.lightgrey,
  }
})
