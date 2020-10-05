import { Button, Form, Input, Item, Text } from 'native-base';
import React, { useState } from 'react';
import { authenticate } from '../../data/user';

export default (props) => {
  const { userContext } = props;

  const [username, setUsername] = useState('test')
  const [password, setPassword] = useState('password')

  const handleSubmit = () => {
    authenticate({username, password}, 'login')
      .then(res => {
        const { user, token } = res;
        userContext.setUser({...user, token})
      })
      .catch(err => console.log(err))
  }

  return (
    <Form>
      <Item>
        <Input value={username} onChangeText={input => setUsername(input)} placeholder="username"/>
      </Item>
      <Item>
        <Input value={password} onChangeText={input => setPassword(input)} placeholder="password"/>
      </Item>
      <Button onPress={() => handleSubmit()}>
        <Text>Submit</Text>
      </Button>
    </Form>
  )
};
