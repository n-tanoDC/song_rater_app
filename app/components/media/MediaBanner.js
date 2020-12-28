import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import RatingIcon from '../common/RatingIcon';
import CustomImageBackground from '../common/CustomImageBackground.js';
import { BackButton, LikeButton, ReviewButton, SpotifyButton } from '../common/buttons/Buttons';

import { checkFavorite, getArtistsWithLink, getCover, getLink } from '../../functions/helpers';
import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';

export default ({ media, rating }) => {
  const [isLiked, setLike] = useState(false);

  const { connectedUser } = useContext(UserContext);

  useEffect(() => checkFavorite(connectedUser, media, setLike), [connectedUser])

  return ( 
    <View style={styles.banner}>
      <CustomImageBackground squared blur uri={getCover(media)}>
        <View style={styles.backButton}>
          <BackButton transparent large />
        </View>
        <View style={styles.likeButton}>
          {connectedUser ? <LikeButton isLiked={isLiked} setLike={setLike} media={media} /> : null}
        </View>
        <View style={styles.mediaWrapper}>
          <Image source={{ uri: getCover(media) }} style={styles.image} />
          <View style={styles.textWrapper}>
            <Text numberOfLines={1} style={styles.title}>{media.name}</Text>
            {getArtistsWithLink(media.artists)}
          </View>
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.actionButtons}>
            <View style={styles.spotifyButton}>
              <SpotifyButton large color={colors.white} link={getLink(media)} />
            </View>
            <View style={styles.reviewButton}>
              {connectedUser ? <ReviewButton media={media} /> : null}
            </View>
          </View>
          <View style={styles.rating}>
            <RatingIcon rating={rating} />
          </View>
        </View>
      </CustomImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  banner: {
    marginBottom: 10
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  mediaWrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '50%',
    aspectRatio: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  textWrapper: {
    padding: 10,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: colors.white,
    fontFamily: 'baloo2-semibold',
    fontSize: 20,
    textShadowColor: colors.darkgrey,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  bottomSection: {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
  },
  actionButtons: {
    flexDirection: 'row'
  },
  spotifyButton: {
    backgroundColor: colors.green,
    borderTopRightRadius: 10
  },
  reviewButton: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  rating: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
