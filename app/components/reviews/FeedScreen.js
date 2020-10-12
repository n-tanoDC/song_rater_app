import { Container, Content, H1, Spinner, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getReviews } from '../../data/reviews';
import ButtonIcon from '../common/ButtonIcon';
import ReviewsList from './ReviewsList';

export default () => {
  useEffect(() => synchronize(), [])

  const synchronize = () => {
    getReviews()
      .then(res => setReviews(res))
      .catch(err => console.log(err))
  }

  const [reviews, setReviews] = useState(null)

  return(
    <Container>
      <View style={styles.header}>
        <H1>Critiques</H1>
        <ButtonIcon name='sync' color='#9E00FF' onPress={() => synchronize()} />
      </View>
      <Content padder>
        {reviews ? <ReviewsList showUser reviews={reviews} /> : <Spinner />}
      </Content>
    </Container>
  )
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#F4F4F4',
    padding: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})