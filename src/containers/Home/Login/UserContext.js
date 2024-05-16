import React, { useState } from 'react';

const UserContext = React.createContext({});

export function UserContextProvider({ children }) {
  const userLogged = JSON.parse(localStorage.getItem('user'));
  const [userData, setUserData] = useState(userLogged);
  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
}

export default UserContext;
