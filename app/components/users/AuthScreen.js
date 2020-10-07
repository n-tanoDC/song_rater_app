import { Container, Content } from 'native-base';
import React, { useContext, useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import { UserContext } from '../../App';
import CustomSegment from '../common/CustomSegment';

export default ({ navigation }) => {
  const [selected, setSelected] = useState('login');
  const userContext = useContext(UserContext);

  const content = selected === 'login' ? 
    <LoginForm userContext={userContext} navigation={navigation}/> :
    <RegistrationForm userContext={userContext}/>
  
  return(
    <Container>
      <CustomSegment data={['login', 'register']} state={{ value: selected, callback: setSelected }}/>
      <Content padder>
        {content}
      </Content>
    </Container>
  )
};
