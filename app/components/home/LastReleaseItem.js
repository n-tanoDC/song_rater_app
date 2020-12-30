import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { SpotifyButton } from '../common/buttons/Buttons';

import { getArtistsWithLink, getCover, getLink } from '../../functions/helpers';
import colors from '../../styles/colors';

export default ({ media }) => {
  const navigation = useNavigation()
  return (
    <TouchableWithoutFeedback onPress={() => navigation.push('Media', { media: media })} style={styles.cover}>
      <View>
        <ImageBackground style={styles.cover} source={{ uri: getCover(media)}}>
          <LinearGradient colors={[colors.transparent, 'rgba(0,0,0,0.75)', 'black']} style={styles.gradient}>
            <View style={styles.mediaInfosWrapper}>
              <View style={styles.mediaInfos}>
                <Text numberOfLines={1} style={styles.mediaName}>{media.name}</Text>
                <Text numberOfLines={1} style={styles.artists}>{getArtistsWithLink(media.artists)}</Text>
              </View>
              <SpotifyButton link={getLink(media)} />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  cover: {
    width: '100%',
    height: '100%'
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  mediaInfosWrapper: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    justifyContent: 'space-between'
  },
  mediaInfos: {
    width: '80%'
  },
  mediaName: {
    color: colors.white,
    fontSize: 22,
    fontFamily: 'baloo2-semibold'
  },
  artists: {
    fontSize: 16,
    color: colors.grey
  }
})
