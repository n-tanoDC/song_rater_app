import { Container, Content } from 'native-base';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import CustomSegment from '../common/CustomSegment';
import AuthForm from './AuthForm';

export default () => {
  const [selected, setSelected] = useState('login');
  const userContext = useContext(UserContext);
  
  return(
    <Container>
      <CustomSegment data={['login', 'register']} state={{ value: selected, callback: setSelected }}/>
      <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }} padder>
        <AuthForm action={selected} userContext={userContext} />
      </Content>
    </Container>
  )
};
