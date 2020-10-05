import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text } from 'native-base';
import React, { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import RegistrationForm from '../auth/RegistrationForm';

export default ({ route }) => {
  const [login, setLogin] = useState(route.params.login);

  const content = login ? <LoginForm /> : <RegistrationForm />
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
