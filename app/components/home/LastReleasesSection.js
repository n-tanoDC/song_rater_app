import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import LastReleaseItem from './LastReleaseItem';
import CustomButton from '../common/buttons/CustomButton';
import Loader from '../common/Loader';

import { getLastReleases } from '../../functions/spotify';
import { catchErrors } from '../../functions/errors';
import colors from '../../styles/colors';

import { AppContext } from '../../contexts/AppContext';

export default () => {
  const [medias, setMedias] = useState(null)
  const { token } = useContext(AppContext);

  useEffect(() => {
    getLastReleases(token)
      .then(res => {
        if (res) {
          setMedias(res.albums.items);
        }
      })
      .catch(catchErrors)
  }, [])

  if (!medias) return <Loader />

  const renderItem = ({ item }) => <LastReleaseItem media={item} />

  const width = Dimensions.get('window').width

  return (
    <>
      <Carousel
        initialNumToRender={20}
        data={medias}
        renderItem={renderItem} 
        windowSize={1}
        sliderWidth={width}
        itemWidth={width}
        loop={true}
        autoplay={true}
        enableSnap={true}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1} />
      <View style={styles.buttonWrapper}>
        <CustomButton backgroundColor={colors.white} color={colors.darkgrey} text='Dernières sorties' />
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    top: 5,
    right: 5
  }
})