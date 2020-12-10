import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { getArtists, getCover } from '../../functions/helpers';
import colors from '../../styles/colors';
import { SpotifyButton } from '../common/buttons/Buttons';

export default ({ media }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.mediaContainer}
        containerStyle={styles.mediaContainerStyle} 
        onPress={() => navigation.push('Media', { media: media })}>
        <Image 
          style={styles.mediaImg} 
          source={{ uri: getCover(media) }} />
        <View style={styles.mediaInfos}>
          <Text 
            numberOfLines={1} 
            style={styles.mediaName}>{media.name}</Text>
          <Text 
            numberOfLines={1} 
            style={styles.artistName}>{getArtists(media.artists)}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonWrapper}>
        <SpotifyButton 
          large
          transparent
          link={media.link} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: { 
    backgroundColor: colors.darkgrey,
    borderColor: '#F4F4F4',
    borderTopWidth: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%'
  },
  mediaContainer: {
    flexDirection: 'row',
  },
  mediaContainerStyle: {
    width: '85%',
  },
  mediaImg: { 
    minWidth: '20%',
    aspectRatio: 1,
  },
  mediaInfos: {
    width: '80%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10, 
  },
  mediaName: { 
    fontSize: 16, 
    color: colors.white,
    fontFamily: 'baloo2-semibold',
  },
  artistName: { 
    color: colors.white,
    fontSize: 12,
  },
  buttonWrapper: { 
    alignSelf: 'center',
    flex: 1, 
    position: 'absolute', 
    right: 5, 
  }
})
