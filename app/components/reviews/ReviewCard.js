import { Icon, Spinner } from 'native-base';
import React, { memo, useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { SpotifyContext } from '../../App';
import { getOneElement } from '../../data/spotify';

const ReviewCard = ({ showUser, review }) => {
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
      <Image small style={styles.avatar} source={{ uri: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }} />) : null

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>"{title}"</Text>
          <Text style={styles.date}>{created_at}</Text>
        </View>
        {thumbnail}
      </View>
      {content ? 
      (<View>
          <Text style={styles.body}>{content}</Text>
      </View>) : null}
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
    </View>
  )
};

export default memo(ReviewCard);

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    overflow:'hidden',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#FDFDFD',

  },
  header: {
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100
  },
  headerText: {
    flex: 4,
    justifyContent: 'center',
    textAlign: "left",
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'grey'
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
    padding: 10
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
