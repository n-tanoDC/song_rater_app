import { Text, Content, Container, Thumbnail, Grid, Col, Row } from 'native-base';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { UserContext } from '../../App';
import ButtonIcon from '../common/ButtonIcon';
import CustomSegment from '../common/CustomSegment';
import FollowButton from '../common/FollowButton';
import ReviewsList from '../reviews/ReviewsList';
import FavsList from './FavsList';
import { logout } from '../../data/user'

export default ({ navigation, route }) => {
  const { user } = route.params;
  const userContext = useContext(UserContext);
  
  const [selected, setSelected] = useState(0);
  const [following, setFollowing] = useState(false);

  const visitor = user !== userContext.user;

  const button = visitor ?
    <FollowButton state={{ following, setFollowing }} /> :
    <ButtonIcon onPress={() => logout(userContext.setUser, navigation)} name='ellipsis-horizontal' color='#3A3A3A' />
    
  return (
    <Container>
      <Content padder>
        <Grid>
          <Row>
            <Col style={styles.avatarContainer}>
              <Thumbnail large source={{ 
                uri:  'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' 
                }} />
            </Col>
            <Col>
              <Row style={styles.spacedRow}>
                  <Text style={{ fontWeight: 'bold'}}>{user.username}</Text>
                  {button}
              </Row>
              <Row>
                <Text style={{ fontSize: 14 }}>{user.description}</Text>
              </Row>
            </Col>
          </Row>
          <Row style={styles.spacedRow}>
            <Text style={styles.stats}>X Critiques</Text>
            <Text style={styles.stats}>X Abonnés</Text>
            <Text style={styles.stats}>X Abonnements</Text>
          </Row>
        </Grid>
        <CustomSegment data={['Critiques', 'Favoris']} state={{ selected, setSelected }}/>
        {!selected ? 
          <ReviewsList navigation={navigation} size='large' reviews={user.reviews}/> : 
          <FavsList user={user} navigation={navigation} />}
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  avatarContainer: { 
    marginTop: 10, 
    width: '30%', 
    alignItems: 'center'
  },
  spacedRow: {
    marginVertical: 10,
    height: 'auto',
    justifyContent: 'space-between'
  },
  centeredRow: {
    justifyContent: 'center'
  },
  stats: { 
    fontSize: 14,
    fontWeight: 'bold'
  },
})
