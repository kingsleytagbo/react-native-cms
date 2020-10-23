import React from 'react';
import { Button, Text, View } from '../components/Themed';
import { createAccount } from '../services/Api';

type Props = {
    navigation: any;
};

const UsersAdmin = ({ navigation }: Props) => {
  const createUser = () => {
    createAccount('test@test.ca', 'password')
      .then((val) => {
          console.log({"CreateAccount Success" : val});
        navigation.navigate('Home');
      })
      .catch((err) => console.log('error:', err.message));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>User Administration</Text>
      <Button title="Create user" onPress={createUser} />
      <Button title="Log in" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default UsersAdmin;