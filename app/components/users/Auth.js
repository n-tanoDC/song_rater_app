import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Content } from 'native-base';

import CustomSegment from '../common/CustomSegment';
import AuthForm from './AuthForm';

export default () => {
  const navigation = useNavigation()

  const [selected, setSelected] = useState(0);
  
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
