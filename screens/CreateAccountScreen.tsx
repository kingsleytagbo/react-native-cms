import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAccount } from '../services/Api';

const CreateAccount = ({ navigation }) => {
  const createUser = () => {
    createAccount('test@test.ca', 'password')
      .then((val) => {
          console.log({"CreateAccount" : val});
        navigation.navigate('Home');
      })
      .catch((err) => console.log('error:', err.message));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>CreateAccount</Text>
      <Button title="Create user" onPress={createUser} />
      <Button title="Log in" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default CreateAccount;