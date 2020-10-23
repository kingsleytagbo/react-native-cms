import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { Button, Text, View } from '../../components/Themed';
import User from '../../models/User';
import { createAccount, getUsersInStorage } from '../../services/Api';

type Props = {
    navigation: any;
};


const UsersAdmin = ({ navigation }: Props) => {
  const [users, setUsers] = useState(Array<User>());

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

  const getUsers = async () => {
    let users = await getUsersInStorage() || Array<User>();
    //users = [];
    setUsers(users);
    console.log({users2: users});
  };

  useEffect(() => {
    console.log({"useEffect": getUsers})
    getUsers();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>User Administration</Text>
      <Button title="Add User" onPress={createUser} />
      <FlatList
        style={{ marginTop: 20 }}
        data={users}
        renderItem={({ item }) => (
          <View style={{ justifyContent: 'center', marginBottom: 10, marginLeft:20, marginRight:20 }}>
            <Text style={{ backgroundColor: 'lightgray', color: 'white', padding: 20, width: Dimensions.get('window').width }}>
              {item.username}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default UsersAdmin;