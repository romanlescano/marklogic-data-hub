import React, { useState, useEffect } from 'react';

type UserContextInterface = {
  name: string,
  // email: string,
  authenticated: boolean
}

const defaultUserData = {
  name: '',
  // email: '',
  authenticated: false
}

interface IAuthContextInterface {
  user: UserContextInterface;
  userAuthenticated: (username: string) => void;
  userNotAuthenticated: () => void;
}

export const AuthContext = React.createContext<IAuthContextInterface>({
  user: defaultUserData,
  userAuthenticated: () => {},
  userNotAuthenticated: () => {}
});

const AuthProvider: React.FC<{ children: any }> = ({children}) => {
  
  const [name, setName] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const sessionUser = sessionStorage.getItem('dataHubExplorerUser');

  const userAuthenticated = (username: string) => {
    sessionStorage.setItem('dataHubExplorerUser', username);
    setAuthenticated(true);
    setName(username);
  };

  const userNotAuthenticated = () => {
    sessionStorage.setItem('dataHubExplorerUser', '');
    setName('');
    setAuthenticated(false);
  };

  useEffect(() => {
    if (sessionUser) {
      userAuthenticated(sessionUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: {name, authenticated}, userAuthenticated, userNotAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;