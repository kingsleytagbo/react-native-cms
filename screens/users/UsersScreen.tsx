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
    setUsers(users);
    console.log({user: users});
  };

  useEffect(() => {
    //getUsers();
  });

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
      <FlatList
        data={users}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 1
            }}>
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item: Partial<User>) => item.username!}
      />
    </View>
  );
};

export default UsersAdmin;