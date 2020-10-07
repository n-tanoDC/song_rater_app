import { Text, Thumbnail, View } from 'native-base';
import React from 'react';

export default ({ small, album }) => {
  const height = width = small ? 50 : 100;
  return (
    <View style={{ justifyContent: 'center', overflow: 'hidden'}}>
      <Thumbnail style={{ height, width, borderRadius: 5 }} square source={{ uri: 'https://images.genius.com/6fd31c8993a97f5851e5f9cfc7cbe5e8.1000x1000x1.jpg'}} />
      <Text style={{ fontWeight: 'bold', textAlign: 'center'}}>QALFQALFQALFQALF</Text>
      <Text style={{ fontSize: 12, textAlign: 'center'}}>Damso</Text>
    </View>
  )
};
