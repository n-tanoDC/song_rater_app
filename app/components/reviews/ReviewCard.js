import React, { memo, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MediaSection from '../media/MediaSection';
import UserAvatar from '../users/UserAvatar';
import RatingIcon from '../common/RatingIcon';

import { accountDeleted, getDate, isVisiting } from '../../functions/helpers';

import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';

const ReviewCard = ({ review, hideMedia }) => {
  let { title, content, media, rating, created_at, author } = review;

  const navigation = useNavigation()
  
  const { connectedUser } = useContext(UserContext);

  let userProp, onPress, mediaSection;
  
  
  if (accountDeleted(author)) {
    author = { username: 'Utilisateur supprimé'};
    userProp = null;
    onPress = null
  } else {
    if (isVisiting(connectedUser, author)) {
      userProp = author;
      onPress = () => navigation.navigate('User', { user: author })
    } else {
      userProp = connectedUser
      onPress = () => navigation.navigate('Account')
    }
  }

  if (!hideMedia) {
    mediaSection = (
      <MediaSection media={media} />
    )
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('Review', { review })}>
        <View style={styles.header}>
          <View style={styles.userWrapper}>
            <UserAvatar 
              small 
              user={userProp}
              onPress={onPress} />
            <View style={styles.headerText}>
              <Text numberOfLines={1} style={styles.username}>{author.username}</Text>
              <Text numberOfLines={1} style={styles.date}>{getDate(created_at)}</Text>
            </View>
          </View>
          <RatingIcon rating={rating} />
        </View>
        <View style={styles.body}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
          <Text numberOfLines={3} style={styles.content}>{content}</Text>
        </View>
      </TouchableOpacity>
      {mediaSection}
    </View>
  )
};

export default memo(ReviewCard);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: colors.grey,
    elevation: 5,
    backgroundColor: colors.white,

  },
  header: {
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    marginLeft: 10,
    justifyContent: 'center',
    textAlign: "left",
  },
  username: {
    fontSize: 16,
    fontFamily: 'baloo2-semibold',
  },
  date: {
    fontSize: 12,
    color: 'grey'
  },
  body: {
    padding: 15,
  },
  title: {
    fontFamily: 'baloo2-semibold',
    fontSize: 14,
    color: colors.darkgrey,
    marginBottom: 10
  },
  content: {
    fontSize: 12
  }
});