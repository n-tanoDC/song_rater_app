import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import CustomImageBackground from '../../common/CustomImageBackground.js';
import { BackButton } from '../../common/buttons/Buttons';

import { getCover } from '../../../functions/helpers';

export default ({ artist }) => {
  return (
    <View style={styles.banner}>
      <CustomImageBackground uri={getCover(artist)}>
        <View style={styles.backButton}>
          <BackButton large transparent />
        </View>
        <Image source={{ uri: getCover(artist) }} style={styles.artistImage} />
        <Text style={styles.artistName}>{artist.name}</Text>
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
    left: 5,
    position: "absolute",
    top: 5,
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
