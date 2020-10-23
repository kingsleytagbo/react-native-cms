import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import UsersScreen from '../screens/users/UsersScreen';
import AddUserScreen from '../screens/users/AddUserScreen';
import { BottomTabParamList, HomeParamList, UsersAdminParamList, LoginParamList } from '../types';
import { getToken, setToken } from '../services/Token';

function LogoTitle(props:any) {
  return (
    <Image
      style={{
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        marginLeft: 15,
        backgroundColor: '#fff'
      }} 
      source={{
        uri:
          'http://www.launchfeatures.com/images/favicon.ico',
      }}
    />
  );
}
// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [authenticated, setAuthenticated] = useState(false);
  const getAuthentication = async () => {
    const token = await getToken() || 'null';
    if(token && (token != 'null') && (token != 'undefined') && (token.length > 10)){
      setAuthenticated(true);
    }
    console.log({'BottomTabNavigator': {token: token, authenticated: authenticated}});
  };

  useEffect(() => {
    getAuthentication();
  });

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      
      <BottomTab.Screen
        name="Login"
        component={LoginNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />

      {((authenticated !== null) && (authenticated === true)) && (
        <BottomTab.Screen
          name="Users"
          component={UsersAdminNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
          }}
        />
      )}

    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();
function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={
          { 
            headerTitle: "Home - React Native Blog",
            headerLeft: props => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: '#2f95dc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          } 
        }
      />
    </HomeStack.Navigator>
  );
}

const LoginStack = createStackNavigator<LoginParamList>();
function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={LoginScreen}
        options={
          { 
            headerTitle: "Login - React Native Blog",
            headerLeft: props => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: '#2f95dc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          } 
        }
      />
    </LoginStack.Navigator>
  );
}

const UsersAdminStack = createStackNavigator<UsersAdminParamList>();
function UsersAdminNavigator() {
  return (
    <UsersAdminStack.Navigator>
      <UsersAdminStack.Screen
        name="Users"
        component={UsersScreen}
        options={{ headerTitle: 'Users Administration' }}
      />
        <UsersAdminStack.Screen
            name="AddUser"
            component={AddUserScreen}
          />
    </UsersAdminStack.Navigator>
  );
}
