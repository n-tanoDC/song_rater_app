import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { catchErrors } from '../../functions/errors';
import { getRandomReviews } from '../../functions/reviews';
import Loader from '../common/Loader';
import SectionTitle from '../common/SectionTitle';
import ReviewCard from '../reviews/ReviewCard';

export default () => {
  const [reviews, setReviews] = useState(null)

  useEffect(() => {
    getRandomReviews()
      .then(res => {
        if (res) {
          setReviews(res)
        }
      })
      .catch(catchErrors)
  }, [])

  if (!reviews) return <Loader />

  const renderItem = ({ item }) => <ReviewCard isRandom review={item} />

  const width = Dimensions.get('window').width

  return (
    <Carousel
      initialNumToRender={5}
      data={reviews}
      renderItem={renderItem} 
      windowSize={1}
      sliderWidth={width}
      itemWidth={width}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1} />
  )
};
