import React from 'react';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../common/CustomButton';
import { Linking, StyleSheet, View } from 'react-native';
import colors from '../../styles/colors';

export const BackButton = ({ transparent, large }) => {
  const navigation = useNavigation();

  return (
    <CustomButton
      color={colors.white}
      icon='chevron-left'
      large={large}
      onPress={() => navigation.goBack()}
      transparent={transparent} />)
};

export const SpotifyButton = ({ transparent, large, link }) => {
  return (
    <View style={[styles.button, styles.spotify]}>
      <CustomButton
        large={large}
        transparent={transparent}
        icon='spotify'
        color={colors.green}
        backgroundColor={colors.darkgrey}
        onPress={() => Linking.openURL(link)} />
    </View>)
}

export const LikeButton = ({ transparent, large, onPress, isLiked }) => {
  return (
    <View style={[styles.button, styles.like]}>
      <CustomButton
        large={large}
        transparent={transparent}
        icon={isLiked ? 'heart' : 'heart-outline'}
        color={colors.red}
        backgroundColor={colors.white}
        onPress={onPress} />
    </View>)
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  spotify: {
    backgroundColor: colors.darkgrey
  },
  like: {
    backgroundColor: colors.white
  }
})
