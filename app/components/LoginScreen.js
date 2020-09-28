import { Button, Form, Input, Item, Text } from 'native-base';
import React, { useContext, useState } from 'react';
import { UserContext } from '../App';

export default ({ navigation }) => {
  const [username, setUsername] = useState('test rn')
  const [password, setPassword] = useState('password')

  const context = useContext(UserContext); 

  const handleSubmit = () => {
    const body = {
      username: username,
      password: password
    }
    fetch('http://192.168.43.202:8000/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        const { user, token } = data
        context.setUser({...user, token})
      })
      .then(() => navigation.navigate('Home'))
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
