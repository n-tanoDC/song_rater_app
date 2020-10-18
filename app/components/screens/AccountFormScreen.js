import React, { useContext, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { pickImage, showToast } from '../../functions';
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';
import { postChanges } from '../../data/user';
import { AppContext } from '../../AppContext';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../config';

export default ({ route }) => {
  const { user } = route.params;

  const [username, setUsername] = useState(user.username);
  const [description, setDescription] = useState(user.description);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const [newAvatar, setNewAvatar] = useState(null);

  const { setUser } = useContext(AppContext);
  const { setUpdates } = useContext(AppContext);

  const navigation = useNavigation();
  
  let source = API_URL + 'uploads/' + avatar;

  const handleSubmit = () => {
    postChanges({ username, description, email }, user.token, newAvatar)
      .then(res => {
        if (res instanceof Error) {
          throw res
        }
        setUser(res)
        showToast('Modifications enregistrées')
      })
      .then(() => {
        setUpdates(true)
        navigation.pop()
      })
      .catch(err => showToast(err.message))
  }
  
  if (newAvatar) {
    source = newAvatar.uri
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: source }} style={styles.image} />
        <CustomInput
          label="Photo de profil"
          icon='image'
          onPress={() => pickImage(setNewAvatar)}
          placeholder="Choisissez une photo..."
          state={{ value: newAvatar ? newAvatar.uri : '', callback: setNewAvatar }} />
        <View>
          <CustomInput 
            label="Nom d'utilisateur"
            placeholder="Nom d'utilisateur" 
            state={{ value: username, callback: setUsername }} />
          <CustomInput 
            label="Adresse email"
            placeholder="Email" 
            state={{ value: email, callback: setEmail }} />
          <CustomInput 
            label="Description"
            placeholder="Description" 
            multiline 
            state={{ value: description, callback: setDescription }} />
        </View>
        <CustomButton 
          text='Mettre à jour' 
          onPress={() => handleSubmit()} />
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  scrollContainer: {
    minHeight: '100%',
    justifyContent: "space-around",
  },
  image: {
    width: '40%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 100,
  },
})
