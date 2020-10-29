import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import { Button,  } from '../../components/Themed';
import User from '../../models/User';
import { createAccount, getUsers } from '../../services/Api';

type Props = {
    navigation: any;
};


const UsersAdmin = ({ navigation }: Props) => {
  const [users, setUsers] = useState(Array<User>());

  const createUser = () => {
    console.log({createUser: {}});
    navigation.navigate('Root', {
      screen: 'Users',
      params: {
        screen: 'AddUser',
        params:{user: {}},
      }});
  };

  const loadUsers = async () => {
    let users = await getUsers() || Array<User>();
    setUsers(users);
    console.log({ users });
  };
  const editUser = async (user: User) => {
    console.log({ editUser: user });
    navigation.navigate('Root', {
      screen: 'Users',
      params: {
        screen: 'EditUser',
        params: { user: user },
      }
    });
  }

  useEffect(() => {
    console.log({ "useEffect": loadUsers })
    loadUsers();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>User Administration</Text>
      <Button title="Add User" onPress={createUser} />
      <FlatList
        style={{ marginTop: 20 }}
        data={users}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => { editUser(item); }}
            underlayColor={'#f1f1f1'}>
            <View style={styles.item}>
              <Text style={{ backgroundColor: 'gray', color: 'white', padding: 20, width: Dimensions.get('window').width }}>
                {item.user_login}
              </Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default UsersAdmin;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    alignItems: 'center',
},

});