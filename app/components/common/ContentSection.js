import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { getArtists, getCover, getLink } from '../../functions';
import ButtonIcon from './ButtonIcon';

export default ({ media }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.mediaContainer}
        containerStyle={styles.mediaContainerStyle} 
        onPress={() => navigation.navigate('Media', { mediaToShow: media })}>
            <Image 
              style={styles.mediaImg} 
              source={{ uri: getCover(media) }} />
            <View style={styles.mediaInfos}>
              <Text 
                numberOfLines={1} 
                style={styles.mediaName}>{media.name}</Text>
              <Text 
                numberOfLines={1} 
                style={styles.artistName}>{getArtists(media)}</Text>
            </View>
      </TouchableOpacity>
      <View style={styles.buttonWrapper}>
        <ButtonIcon
        name='spotify'
        color='#1DB954'
        onPress={() => Linking.openURL(getLink(media))} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#3A3A3A',
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
    fontSize: 14, 
    color: '#FDFDFD',
    fontWeight: 'bold',
  },
  artistName: { 
    color: '#FDFDFD',
    fontSize: 12,
  },
  buttonWrapper: {
    width: '15%',
    alignItems: "center", 
    flexDirection: "row", 
    justifyContent: 'flex-end',
    padding: 10,
  },
})
