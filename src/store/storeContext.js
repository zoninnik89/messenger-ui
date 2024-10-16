import React from 'react';
import chatStore from './store'; // MobX store

export const StoreContext = React.createContext({
  chatStore,
});

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={{ chatStore }}>
      {children}
    </StoreContext.Provider>
  );
};