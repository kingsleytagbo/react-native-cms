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
    console.log({'Login': {email: email, password:password, useApi: useApi}});
    if (useApi) {
      if ((email && email === '') && (password && password === '')) {
        return mockSuccess({ auth_token: 'Login Api - Success' });
      }
      else {
        return mockFailure({ error: 500, message: 'Login Api - Failure' });
      }
    }
    else{
      return mockFailure({ error: 500, message: 'Login - Failure' });
    }
  };

  export const createAccount = (email:string, password:string, shouldSucceed = true) => {
    console.log(email, password);
  
    if (!shouldSucceed) {
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