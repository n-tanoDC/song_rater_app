import { Container, Content } from 'native-base';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import CustomSegment from '../common/CustomSegment';
import AuthForm from './AuthForm';

export default () => {
  const [selected, setSelected] = useState(0)
  const userContext = useContext(UserContext);

  const action = selected === 0 ? 'login' : 'register'
  
  return(
    <Container>
      <CustomSegment data={['Se connecter', 'Créer un compte']} state={{ selected, setSelected }}/>
      <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }} padder>
        <AuthForm action={action} userContext={userContext} />
      </Content>
    </Container>
  )
};
