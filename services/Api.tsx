import AsyncStorage from '@react-native-community/async-storage';
import User from '../models/User';
const API_URL = 'https://nodejsappapi.herokuapp.com';


export const getUsersInStorage = async () => {
  const result = Array<User>();
  try {
    const value = await AsyncStorage.getItem('@users');
    if (value) {
      result.concat(JSON.parse(value));
    }
  } catch (error) {
    console.log({error_getUsersInStorage: error});
  }
  return result;
};

export const saveUsersInStorage = async (value: Array<User>) => {
  try {
    await AsyncStorage.setItem('@auth_token', JSON.stringify(value));
  } catch (error) {
    console.log({error_saveUsersInStorage: error});
  }
};

const mockSuccess = (value:any) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), 2000);
    });
  };
  
  const mockFailure = (value:any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(value), 2000);
    });
  };

  export const login = (email:string, password:string, useApi:boolean = true) => {
    // console.log({'Login': {email: email, password:password, useApi: useApi}});
    if (useApi) {
      if ((email && email !== '') && (password && password !== '')) {
        const body = {
          "login": {
            "username": email,
            "password": password
          }
        };
        return post('/login', body);
        //return mockSuccess({ auth_token: 'Login Api - Success!' });
      }
      else {
        return mockFailure({ error: 500, message: 'Login Api - Failure' });
      }
    }
    else{
      return mockFailure({ error: 500, message: 'Login - Failure' });
    }
  };

  export const createAccount = (user: User, useApi:boolean = true) => {
    console.log({user: user});
  
    if (!useApi) {
      return mockFailure({ error: 500, message: 'Something went wrong!' });
    }
  
    return mockSuccess({ auth_token: 'successful_fake_token' });
  };



const getAuthenticationToken = () => 'successful_fake_token';
export const getUsers = (shouldSucceed = true) => {
  const token = getAuthenticationToken();

  if (!shouldSucceed) {
    return mockFailure({ error: 401, message: 'Invalid Request' });
  }

  return mockSuccess({
    users: [
      {
        email: 'test@test.ca',
      },
      {
        email: 'test2@test.ca',
      },
    ],
  });
};


export const post = async (destination:string, body:any) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };
  const result = await fetch(`${API_URL}${destination}`, {
    method: 'POST',
    headers: {
      "Content-Type": "text/plain"
  },
    body: JSON.stringify(body),
  });

  // console.log({result:result, body: result.body});

  if (result.ok) {
    const response = result.json();
    return response;
  }
  throw { error: result.status };
};