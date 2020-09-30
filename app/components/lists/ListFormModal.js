import { Button, Form, Input, Item, Text } from 'native-base';
import { Modal } from 'react-native';
import React, { useState } from 'react';
import { createList } from '../../data/lists';

export default ({ visibility, userContext}) => {

  const [title, setTitle] = useState('test list');
  const [description, setDescription] = useState('description list');

  const handleSubmit = () => {
    createList({ title, description }, userContext.user.token)
      .then(res => console.log(res))
      .then(() => visibility.switchList(false))
      .catch(err => console.log(err))
  }

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visibility.list}>
      <Form>
        <Item>
          <Input value={title} onChangeText={input => setTitle(input)} placeholder="Titre"/>
        </Item>
        <Item>
          <Input value={description} onChangeText={input => setDescription(input)} placeholder="Description"/>
        </Item>
        <Button onPress={() => handleSubmit()}>
          <Text>Submit</Text>
        </Button>
      </Form>
    </Modal>
  )
};