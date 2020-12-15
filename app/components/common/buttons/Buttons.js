import React, { useContext } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from './CustomButton';
import colors from '../../../styles/colors';
import { UserContext } from '../../../contexts/UserContext';
import { updateFavStatus } from '../../../functions/user';
import { showToast } from '../../../functions/helpers';

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <CustomButton
      color={colors.white}
      icon='chevron-left'
      large
      onPress={() => navigation.goBack()}
      transparent />)
};

export const ReviewButton = ({ media }) => {
  const navigation = useNavigation();

  return (
    <CustomButton
      large
      icon='music-note-plus'
      color={colors.white}
      backgroundColor={colors.transparent}
      onPress={() => navigation.navigate('Review', { media, reviewToShow: null })} />)
}

export const SpotifyButton = ({ link, color = colors.green }) => {
  return (
    <View style={[styles.button, styles.spotify]}>
      <CustomButton
        large
        icon='spotify'
        color={color}
        backgroundColor={colors.transparent}
        onPress={() => Linking.openURL(link)} />
    </View>)
};

export const LikeButton = ({ isLiked, setLike, media }) => {
  const { connectedUser, setConnectedUser } = useContext(UserContext);

  const handlePress = async () => {
    let method, message;
    if (isLiked) {
      method = 'DELETE';
      message = 'Supprimé des favoris';
    } else {
      method = 'POST';
      message = 'Ajouté aux favoris';
    }

    const newFavorites = await updateFavStatus(media, method, connectedUser.token);
    setConnectedUser({ ...connectedUser, favorites: newFavorites });
    setLike(!isLiked)
    showToast(message)
  };

  return (
    <CustomButton
      large
      icon={isLiked ? 'heart' : 'heart-outline'}
      color={colors.white}
      backgroundColor={colors.transparent}
      onPress={() => handlePress()} />)
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    height: '100%',
    overflow: 'hidden',
  }
})
