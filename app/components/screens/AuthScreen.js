import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text } from 'native-base';
import React, { useContext, useState } from 'react';
import LoginForm from '../auth/LoginForm';
import RegistrationForm from '../auth/RegistrationForm';
import { UserContext } from '../../App';

export default ({ navigation, route }) => {
  const [login, setLogin] = useState(route.params.login);
  const userContext = useContext(UserContext);

  const content = login ? <LoginForm userContext={userContext} navigation={navigation}/> : <RegistrationForm userContext={userContext}/>
  return(
    <Container>
      <Header hasSegment>
        <Left />
        <Body>
          <Segment>
            <Button onPress={() => !login? setLogin(true) : null} first active={login}><Text>Login</Text></Button>
            <Button onPress={() => login? setLogin(false) : null} last active={!login}><Text>Signup</Text></Button>
          </Segment>
        </Body>
        <Right />
      </Header>
      <Content padder>
        {content}
      </Content>
    </Container>
  )
};
