import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'mobx-react-lite';
import chatStore from './store/store';

ReactDOM.render(
  <Provider chatStore={chatStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);