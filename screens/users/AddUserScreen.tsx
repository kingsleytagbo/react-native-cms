import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { createAccount } from '../../services/Api';
import Login from '../../models/Login';

type Props = {
    navigation: any;
};

const TextInputStyle:TextStyle = {
  height: '2em',
  width: 300,
  fontSize: 14,
  borderColor: Colors.light.tint,
  borderWidth: 1,
  marginTop: 2,
  marginBottom: '1em',
  paddingStart: '0.5em',
  paddingBottom: '0.5em',
  paddingTop: '0.5em',
  color: 'Colors.light.tint'
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: '2em',
    width: 300,
    fontSize: '1em',
    borderColor: Colors.light.tint,
    borderWidth: 1,
    marginTop: 2,
    marginBottom: '1em',
    paddingStart: '0.5em',
    paddingBottom: '0.5em',
    paddingTop: '0.5em',
    color: Colors.light.tint,
    selectionColor:"#FFFFFF",
    placeholderTextColor:'gray'
  },
  textInput: TextInputStyle,
  label: { height: '2em', fontSize: '1em', marginBottom: '2em', color: '#191970', fontWeight:'normal'}

});

const CreateAccount = ({ navigation }: Props) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const buttonText = 'Create User';

  const createUser = () => {
    createAccount(email, password)
      .then((val) => {
          console.log({"CreateAccount Success" : val});
        navigation.navigate('Home');
      })
      .catch((err) => console.log('error:', err.message));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.label}><label>UserName:</label>
        <TextInput
          style={styles.textInput}
          onChangeText={(text: any) => onChangeEmail(text)}
          value={email}
          placeholder="Enter your Username ..."
          keyboardType="email-address"
        />
      </View>

      <View style={styles.label}><label>Password:</label>
        <TextInput
          style={styles.textInput}
          onChangeText={(text: any) => onChangePassword(text)}
          value={password}
          placeholder="Enter your Password ..."
          secureTextEntry
        />
      </View>

      <Button
        style={{ color: 'White', backgroundColor: 'White', }}
        title={buttonText} onPress={createUser} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </ScrollView>
  );
};

export default CreateAccount;