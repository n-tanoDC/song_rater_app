import React, { useContext, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import CustomImageBackground from '../../common/CustomImageBackground.js';
import { BackButton, LikeButton } from '../../common/buttons/Buttons';

import { checkFavorite, getCover } from '../../../functions/helpers';
import { UserContext } from '../../../contexts/UserContext.js';

export default ({ artist }) => {

  const [isLiked, setLike] = useState(false);

  const { connectedUser } = useContext(UserContext);

  useEffect(() => checkFavorite(connectedUser, artist, setLike), [connectedUser])

  return (
    <View style={styles.banner}>
      <CustomImageBackground uri={getCover(artist)}>
        <View style={styles.backButton}>
          <BackButton large transparent />
        </View>
        <Image source={{ uri: getCover(artist) }} style={styles.artistImage} />
        <Text style={styles.artistName}>{artist.name}</Text>
        <View style={styles.likeButton}>
          {connectedUser ? (
            <LikeButton 
              isLiked={isLiked}
              setLike={setLike}
              media={artist} />) : null}
        </View>
      </CustomImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    alignItems: 'center',
    justifyContent: 'center',
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
  artistImage: {
    borderColor: colors.white,
    borderRadius: 1000,
    borderWidth: 2,
    height: 100,
    width: 100,
  },
  artistName: {
    color: colors.white,
    fontFamily: 'baloo2-semibold',
    fontSize: 20,
    marginTop: 5,
  },
})
