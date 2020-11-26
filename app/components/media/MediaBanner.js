import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, Linking, StyleSheet, Text, View } from 'react-native';

import RatingIcon from '../common/RatingIcon';
import CustomButton from '../common/CustomButton';

import { getArtists, getCover, getLink } from '../../functions';
import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';

export default ({ media, rating }) => {
  const navigation = useNavigation();
  const [isLiked, setLike] = useState(false);

  const { connectedUser } = useContext(UserContext);

  let actionButtons;

  if (connectedUser) {
    actionButtons = (
      <View style={styles.actionButtonsWrapper}>
        <View style={[styles.actionButton, { backgroundColor: colors.secondary } ]}>
          <CustomButton
            large
            icon='music-note-plus'
            color={colors.white}
            backgroundColor={colors.secondary}
            onPress={() => navigation.navigate('Review', { media, reviewToShow: null })} />
        </View>
        <View style={[styles.actionButton, { backgroundColor: colors.white } ]}>
          <CustomButton
            large
            icon={isLiked ? 'heart' : 'heart-outline'}
            color={colors.red}
            backgroundColor={colors.white}
            onPress={() => setLike(!isLiked)} />
        </View> 
      </View>
    )
  }

  return ( 
    <View style={styles.banner}>
      <ImageBackground blurRadius={20} source={{ uri: getCover(media) }} style={styles.imageBg}>
        <View style={styles.backButton}>
          <CustomButton
            color={colors.white}
            icon='chevron-left'
            large
            onPress={() => navigation.goBack()}
            transparent />
        </View>
        <View style={styles.mediaWrapper}>
          <Image resizeMode='contain' source={{ uri: getCover(media) }} style={styles.image} />
          <View style={styles.textWrapper}>
            <Text numberOfLines={1} style={styles.title}>{media.name}</Text>
            <Text numberOfLine={1} style={styles.artists}>{getArtists(media)}</Text>
          </View>
        </View>
        <View style={styles.bottomSection}>
        <View style={styles.actionButtonsWrapper}>
          <View style={[styles.actionButton, styles.rating]}>
            <RatingIcon rating={rating} />
          </View>
            <View style={[styles.actionButton, { backgroundColor: colors.darkgrey } ]}>
              <CustomButton
                large
                icon='spotify'
                color={colors.green}
                backgroundColor={colors.darkgrey}
                onPress={() => Linking.openURL(getLink(media))} />
            </View>
          </View>
          {actionButtons}
        </View>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  banner: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  backButton: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%'
  },
  imageBg: {
    width: '100%',
    aspectRatio: 1
  },
  mediaWrapper: {
    height: '73%',
    justifyContent: 'space-between'
  },
  image: {
    height: '70%',
    aspectRatio: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  textWrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: colors.white,
    fontFamily: 'baloo2-semibold',
    fontSize: 18,
    textShadowColor: colors.darkgrey,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  artists: {
    color: colors.white,
    textShadowColor: colors.darkgrey,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  bottomSection: {
    height: '12%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  actionButtonsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  actionButton: {
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  rating: {
    backgroundColor: colors.white,
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
})
