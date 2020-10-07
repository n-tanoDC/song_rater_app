import { Text, Content, Container, Thumbnail, Grid, Col, Row } from 'native-base';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { UserContext } from '../../App';
import FollowButton from '../common/FollowButton'
import CustomSegment from '../common/CustomSegment';
import ReviewsList from '../reviews/ReviewsList';
import AuthScreen from './AuthScreen';


export default ({ navigation }) => {
  const [selected, setSelected] = useState('critiques');
  const [following, setFollowing] = useState(false);

  const userContext = useContext(UserContext);
  
  if (!userContext.user) {
    return <AuthScreen />
  }

  const { user } = userContext;
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
                  <FollowButton text='Suivre' state={{ value: following, callback: setFollowing }} />
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
          <Row style={styles.centeredRow}>
            <CustomSegment 
              data={['critiques', 'favoris']} 
              state={{ value: selected, callback: setSelected }} />
          </Row>
        </Grid>
        {selected === 'critiques' ? <ReviewsList navigation={navigation} reviews={[]}/> : <ReviewsList reviews={[]} />}
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