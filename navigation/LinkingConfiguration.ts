import * as Linking from 'expo-linking';
/**
 * add routes here to shorten them, e..g. /users/users is shortened to /users
 */
export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Login: {
            screens: {
             Login: 'login',
            },
          },
          Users: {
            screens: {
             Users: 'users',
             AddUser: 'users/adduser'
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
