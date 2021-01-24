import React, { memo, useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MediaSection from '../media/MediaSection';
import UserAvatar from '../users/UserAvatar';
import RatingIcon from '../common/RatingIcon';
import VotingSection from './VotingSection';

import { accountDeleted, getDate, isVisiting } from '../../functions/helpers';

import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';

const ReviewCard = (props) => {
  const { hideMedia, isRandom } = props;
  const [review, setReview] = useState(props.review)
  
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
    <View style={[styles.card, isRandom ? styles.card_random : {}]}>
      <TouchableOpacity onPress={() => navigation.push('Review', { review, setReview })}>
        <View style={styles.header}>
          <VotingSection review={review} setReview={setReview} />
          <View style={styles.userWrapper}>
            <View>
              <Text numberOfLines={1} style={styles.username}>{author.username}</Text>
            </View>
            <UserAvatar 
              small 
              user={userProp}
              onPress={onPress} />
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.bodyHeader}>
            <View>
              <Text numberOfLines={1} style={styles.title}>{title}</Text>
              <Text numberOfLines={1} style={styles.date}>{getDate(created_at)}</Text>
            </View>
            <RatingIcon rating={rating} />
          </View>
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
    overflow: 'hidden',
    borderColor: colors.grey,
    elevation: 5,
    backgroundColor: colors.white,
    borderBottomWidth: 5,
    borderColor: colors.grey,
  },
  card_random : {
    marginHorizontal: 25,
    marginVertical: 10,
    borderRadius: 20,
  },
  header: {
    backgroundColor: colors.lightgrey2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  username: {
    marginRight: 10,
    fontSize: 16,
    fontFamily: 'baloo2-semibold',
    justifyContent: 'center',
    textAlign: "left",
  },
  body: {
    padding: 10,
  },
  bodyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'baloo2-semibold',
    fontSize: 14,
    color: colors.darkgrey,
  },
  date: {
    fontSize: 12,
    color: 'grey',
  },
  content: {
    fontSize: 12
  }
});