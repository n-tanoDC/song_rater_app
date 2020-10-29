import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from './CustomButton';
import ButtonIcon from './ButtonIcon';
import ContentSection from './ContentSection';
import UserAvatar from '../users/UserAvatar';

import { isVisiting } from '../../functions';

import { UserContext } from '../../contexts/UserContext';
import colors from '../../styles/colors';

export default ({ user, media }) => {
  const navigation = useNavigation();
  const { connectedUser } = useContext(UserContext);
  
  let userSection = (
    <CustomButton 
      onPress={() => navigation.navigate('Account')}
      text='Se connecter'
      color={colors.primary} />)
  
  if (user) {
    let onPress = () => navigation.navigate('User', { user })
    if (!isVisiting(connectedUser, user)) {
      onPress = () => navigation.navigate('Account')
    }

    const avatar = user.username === 'Utilisateur supprimé' ? null : <UserAvatar user={user} small onPress={onPress} />

    userSection = (
      <View style={styles.user}>
        <Text style={styles.username}>{user.username}</Text>
        {avatar}
      </View>)
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <ButtonIcon name='chevron-left' color={colors.darkgrey} onPress={() => navigation.goBack()}/>
        {userSection}
      </View>
      <ContentSection media={media} />
    </View>
  ) 
};

const styles = StyleSheet.create({
  headerTop: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.grey
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  username: {
    fontFamily: 'baloo2-semibold',
    fontSize: 16,
    marginRight: 10
  },
  headerBottom: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey,
    width: '100%'
  },
  mediaInfosContainer: {
    width: '80%',
    flexDirection: 'row',
  },
  mediaImageContainer: {
    marginRight: 10,
    width: '20%',
  },
  mediaImage: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  mediaInfos: {
    width: '80%',
    justifyContent: 'space-evenly'
  },
  artist: {
    fontSize: 14
  },
  year: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'baloo2-semibold'
  },
  mediaRatingContainer: {
    width: '20%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})
