import AsyncStorage from '@react-native-community/async-storage';
import User from '../models/User';
const API_URL = 'https://nodejsappapi.herokuapp.com';


export const getUsersInStorage = async () => {
  let result = Array<User>();
  try {
    const value = await AsyncStorage.getItem('@users');
    if (value) {
      result = result.concat(JSON.parse(value));
    }
    console.log({getUsersInStorage: {result: result, value:value}});
  } catch (error) {
    console.log({error_getUsersInStorage: error});
  }
  return result;
};

export const saveUsersInStorage = async (value: Array<User>) => {
  try {
    const result = JSON.stringify(value);
    console.log({saveUsersInStorage: {result: result, value: value}});
    await AsyncStorage.setItem('@users', JSON.stringify(value));
  } catch (error) {
    console.log({error_saveUsersInStorage: error});
  }
};

export const login = (email: string, password: string, useApi: boolean = true) => {
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
  else {
    return mockFailure({ error: 500, message: 'Login - Failure' });
  }
};

export const getUsers = (useApi: boolean = true) => {
  // console.log({'Login': {email: email, password:password, useApi: useApi}});
  if (useApi) {
    const body = {};
    return post('/users/getUsers', body);
  }
  else {
    return getUsersInStorage();
  }
};

  export const createUser = (email:string, password:string, useApi:boolean = true) => {
    // console.log({'Login': {email: email, password:password, useApi: useApi}});
    if (useApi) {
      if ((email && email !== '') && (password && password !== '')) {
        const body = {
          "user": {
            user_login:email, user_pass:password, user_nicename:password,user_email:email,display_name:email,
              user_status:1,user_registered:1,user_url:'',user_activation_key:'',spam:0,
              deleted:0,site_id:1
          }
        };
        return post('/users/createUser', body);
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


  export const createAccount = async (user: User, useApi:boolean = true) => {
    // console.log({user: user});
    if (!useApi) {
      const users = await getUsersInStorage();
      users.push(user);
      let result = await saveUsersInStorage(users);
      return result;
      //return mockFailure({ error: 500, message: 'Something went wrong!' });
    }
    else{
      return createUser(user.user_nicename, user.user_pass, true);
    }
  
    return mockSuccess({ auth_token: 'successful_fake_token' });
  };



const getAuthenticationToken = () => 'successful_fake_token';
export const getAuthenticatedUsers = (shouldSucceed = true) => {
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