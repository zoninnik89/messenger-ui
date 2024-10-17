import React from 'react';
import chatStore from './chatStore'; // MobX chat store
import userStore from './userStore'; // MobX store

export const StoreContext = React.createContext({
  chatStore,
  userStore,
});

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={{ chatStore, userStore }}>
      {children}
    </StoreContext.Provider>
  );
};