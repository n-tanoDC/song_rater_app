import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import Loader from '../common/Loader';
import SectionTitle from '../common/SectionTitle';
import ReviewCard from '../reviews/ReviewCard';

import { catchErrors } from '../../functions/errors';
import { getRandomReviews } from '../../functions/reviews';

export default () => {
  const [reviews, setReviews] = useState(null)
  
  const loadRandomReviews = () => {
    getRandomReviews()
      .then(reviews => {
        if (reviews) {
          const filteredReviews = reviews.filter(review => review.title !== '' && review.content !== '')
          setReviews(filteredReviews)
        }
      })
      .catch(catchErrors)
  }

  useEffect(() => { loadRandomReviews() }, [])

  if (!reviews) return <Loader />

  const renderItem = ({ item }) => <ReviewCard isRandom review={item} />

  const width = Dimensions.get('window').width

  return (
    <>
      <SectionTitle text='Critiques aléatoires' icon='reload' onPress={() => loadRandomReviews()} />
      <Carousel
        initialNumToRender={5}
        data={reviews}
        renderItem={renderItem} 
        windowSize={1}
        sliderWidth={width}
        itemWidth={width}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1} />
    </>
  )
}
