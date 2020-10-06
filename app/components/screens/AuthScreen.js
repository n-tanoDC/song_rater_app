import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text } from 'native-base';
import React, { useContext, useState } from 'react';
import LoginForm from '../auth/LoginForm';
import RegistrationForm from '../auth/RegistrationForm';
import { UserContext } from '../../App';
import CustomSegment from '../CustomSegment';

export default ({ navigation }) => {
  const [selected, setSelected] = useState('login');
  const userContext = useContext(UserContext);

  const content = selected === 'login' ? 
    <LoginForm userContext={userContext} navigation={navigation}/> :
    <RegistrationForm userContext={userContext}/>
  
  return(
    <Container>
      <CustomSegment data={['login', 'register']} state={{ selected, cb: setSelected }}/>
      <Content padder>
        {content}
      </Content>
    </Container>
  )
};
