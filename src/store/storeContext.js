import React from 'react';
import chatStore from './chatStore'; // MobX chat store
import userStore from './userStore'; // MobX user store
import WebSocketStore from './websocketStore'; // MobX websocket store

const webSocketStore = new WebSocketStore(chatStore, userStore);

export const StoreContext = React.createContext({
  chatStore,
  userStore,
  webSocketStore,
});

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={{ chatStore, userStore, webSocketStore }}>
      {children}
    </StoreContext.Provider>
  );
};