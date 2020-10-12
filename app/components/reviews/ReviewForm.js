import { Container, Content, Form, Right, Left, Body, Header, Text, View, Title } from 'native-base';
import React, { useContext, useState } from 'react';
import SwipeableRating from 'react-native-swipeable-rating';import { Alert } from 'react-native';
import { UserContext } from '../../App';
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';
import { API_URL } from '../../config';

export default ({ navigation, route }) => {

  const { element } = route.params;
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(5)
  
  const postReview = () => {

  }

  if (!user) {
    Alert.alert(
      'Connexion nécessaire',
      'Veuillez-vous connecter pour publier une critique.',
      [
        {
          text: 'Pas maintenant',
          onPress: () => navigation.goBack()
        },
        {
          text: 'Me connecter',
          onPress: () => navigation.navigate('User')
        }
      ],
      { cancelable: false }
    )
    return <></>
  }

  const handleSubmit = () => {
    const body = { title, rating, content, element: element.id }
    console.log(body);
    fetch(API_URL + 'review?secret_token=' + user.token, { 
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, rating, content, element: element.id, element_type: element.type })
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <Container>
      <Content padder>
      <Text>{element.name}</Text>
      <View style={{ alignItems: 'center' }}>
        <SwipeableRating
          rating={rating}
          minRating={1}
          maxRating={10}
          size={28}
          gap={1}
          gap={4}
          onPress={input => setRating(input)}
        />
      </View>
        <Form>
          <CustomInput 
            placeholder='Titre'
            state={{ value: title, callback: setTitle }}
          />
          
          <CustomInput 
            placeholder='Rédigez votre critique...'
            multiline
            state={{ value: content, callback: setContent }}
          />

          <CustomButton 
            color='#FFB906'
            onPress={() => handleSubmit()}
            text='Publier'
          />
        </Form>
      </Content>
    </Container>
  )
};
