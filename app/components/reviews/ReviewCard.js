import { Card, CardItem, Left, Icon, Text, Thumbnail, Body, Right, View } from 'native-base';
import React from 'react';
import AlbumCard from '../content/AlbumCard';

export default ({ size, review, navigation }) => {
  switch (size) {
    case 'large':
      return (
        <Card style={{ borderRadius: 10, overflow: 'hidden'}}>
          <CardItem style={{ backgroundColor: '#F9F9F9'}}>
            <Left>
              <Thumbnail source={{ uri: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }} />
            </Left>
            <Body style={{ flex: 2, justifyContent: "center" }}>
              <Text>username</Text>
              <Text note>date</Text>
            </Body>
            <Right style={{ flexDirection: "row"}}>
              <Text>{review.rating} </Text>
              <Icon name='star' style={{ color: '#FFB906' }} /> 
            </Right>
          </CardItem>
          <CardItem>
            <Body style={{ flex: 3 }}>
              <Text style={{ textAlign: "left", fontWeight: 'bold'}}>Titre de la review</Text>
              <Text style={{ fontSize: 14 }}>Et licet quocumque oculos flexeris feminas adfatim multas spectare cirratas, quibus, si nupsissent, per aetatem ter iam nixus poterat suppetere liberorum [...]</Text>
            </Body>
            <Right>
              <AlbumCard small album={review.element}/>
            </Right>
          </CardItem>
        </Card>
      )
    default:
      return (
        <Card style={{ borderRadius: 10, overflow: "hidden"}}>
          <CardItem button onPress={() => navigation.navigate('Feed', { screen: 'Review' })} style={{ backgroundColor: '#F9F9F9' }}>
            <Left>
              <Thumbnail square source={{ uri: 'https://images.genius.com/6fd31c8993a97f5851e5f9cfc7cbe5e8.1000x1000x1.jpg'}}/>
            </Left>
            <Body style={{ flex: 3 }}>
              <Text>{review.title}</Text>
              <Text style={{ fontSize: 12 }}>{review.content ? review.content : 'Aucun contenu'}</Text>
            </Body>
            <Right style={{ justifyContent: "space-between" }}>
              <Thumbnail small source={{ uri: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}} />
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'stretch'}}>
                <Text style={{ fontWeight: "bold" }}>{review.rating} </Text>
                <Icon name='star' style={{ color: '#FFB906' }} /> 
              </View>
            </Right>
          </CardItem>
        </Card>
      )
  }
};