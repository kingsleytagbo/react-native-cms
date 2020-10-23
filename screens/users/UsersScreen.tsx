import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Button, Text, View } from '../../components/Themed';
import User from '../../models/User';
import { createAccount, getUsersInStorage } from '../../services/Api';

type Props = {
    navigation: any;
};


const UsersAdmin = ({ navigation }: Props) => {
  const [users, setUsers] = useState(Array<User>());
  const getUsers = async () => {
    let users = await getUsersInStorage() || Array<User>();
    users = [];
    // setUsers(users);
    console.log({user: users});
  };

  getUsers();

  const createUser = () => {
    createAccount(new User('test@test.ca', 'password'))
      .then((val) => {
          console.log({"CreateAccount Success" : val});
          navigation.navigate('Root', {
            screen: 'Users',
            params: {
              screen: 'AddUser',
            },
          });
      })
      .catch((err) => console.log('error:', err.message));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>User Administration</Text>
      <Button title="Add User" onPress={createUser} />
      {users.map((user) => (
          <Text key={user.username}>{user.username}</Text>
        ))}
    </View>
  );
};

export default UsersAdmin;