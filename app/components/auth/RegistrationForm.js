import { Button, Form, Input, Item, Text } from 'native-base';
import React, { useState } from 'react';
import { authenticate } from '../../data/user';

export default (props) => {
  const [username, setUsername] = useState('test rn');
  const [email, setEmail] = useState('test rn');
  const [password, setPassword] = useState('password');

  const handleSubmit = () => {
    authenticate({username, email, password}, 'signup')
  }

  return (
    <Form>
      <Item>
        <Input value={username} onChangeText={input => setUsername(input)} placeholder="username"/>
      </Item>
      <Item>
        <Input value={email} onChangeText={input => setEmail(input)} placeholder="email"/>
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
