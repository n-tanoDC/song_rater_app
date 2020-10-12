import { Body, Container, Content, H1, Header, Right, Spinner } from 'native-base';
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
      <Header style={styles.header} transparent>
        <Body>
          <H1 style={styles.title}>Critiques</H1>
        </Body>
        <Right>
          <ButtonIcon name='sync' size={30} color='#9E00FF' onPress={() => synchronize()} />
        </Right>
      </Header>
      <Content padder>
        {reviews ? <ReviewsList showUser reviews={reviews} /> : <Spinner />}
      </Content>
    </Container>
  )
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 15,
  },
  header: {
    borderBottomWidth: 1
  }
})