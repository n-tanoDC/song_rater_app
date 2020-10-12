import { Card, CardItem, Icon, Text, Body, View, Spinner, Left, Thumbnail } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { SpotifyContext } from '../../App';
import { getOneElement } from '../../data/spotify';

export default ({ showUser, review }) => {
  useEffect(() => {
    getOneElement(element, element_type, token)
      .then(res => loadData(res))
      .catch(err => console.log(err))
  }, []);
  const [data, loadData] = useState(null);
  const { token } = useContext(SpotifyContext);
  const { title, content, element, element_type, rating, created_at } = review;

  if (!data) {
    return <Spinner />
  }

  const thumbnail = showUser? (
    <Left>
      <Thumbnail small source={{ uri: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }} />
    </Left>) : null

  return (
    <Card style={styles.card}>
      <CardItem style={styles.header}>
        {thumbnail}
        <Body style={styles.headerText}>
          <Text style={styles.bold}>{title}</Text>
          <Text note>{created_at}</Text>
        </Body>
      </CardItem>
      {content ? 
      (<CardItem>
        <Body>
          <Text style={styles.body}>{content}</Text>
        </Body>
      </CardItem>) : null}
      <View style={styles.footer}>
        <View style={styles.footerElement}>
          <Image style={styles.footerImg} source={{ uri: data.album.images[0].url }} />
          <View style={styles.footerText}>
            <Text style={styles.contentName}>{data.name}</Text>
            <Text style={styles.artistName}>{data.artists[0].name}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating} </Text>
          <Icon name='star' style={styles.ratingIcon} /> 
        </View>
      </View>
    </Card>
  )
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#F9F9F9',
  },
  headerText: {
    flex: 4,
    justifyContent: 'center',
    textAlign: "left",
  },
  bold: {
    fontWeight: 'bold',
  },
  ratingContainer: { 
    padding: 10,
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: 'flex-end',
  },
  ratingText: {
    fontSize: 18, 
    fontWeight: "bold",
  },
  ratingIcon: {
    color: '#FFB906',
  },
  body: {
    fontSize: 14,
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    borderTopWidth: 1, 
    borderColor: '#F4F4F4'
  },
  footerElement: {
    flexDirection: 'row'
  },
  footerImg: { 
    width: 60, 
    height: 60 
  },
  footerText: { 
    marginLeft: 10, 
    justifyContent: 'space-evenly'
  },
  elementName: { 
    fontSize: 14, 
    fontWeight: 'bold',
  },
  artistName: { 
    fontSize: 12,
  }
})
