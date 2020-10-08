import { Container, Content } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import CustomSegment from '../common/CustomSegment';
import AuthForm from './AuthForm';

export default ({ navigation }) => {
  const [selected, setSelected] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => { 
    if (user) {
      navigation.navigate('Profile', { user })
    }
  })

  const action = selected === 0 ? 'login' : 'register'
  
  return (
    <Container>
      <CustomSegment data={['Se connecter', 'Créer un compte']} state={{ selected, setSelected }}/>
      <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }} padder>
        <AuthForm navigation={navigation} action={action} />
      </Content>
    </Container>
  )
};
