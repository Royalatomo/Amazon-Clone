// Importing Pre-built Components
import React from 'react';
import ReactDOM from 'react-dom';

// Importing Custom Built Components
import App from './App';
import reducer, { initialState } from './components/reducer';
import { StateProvider } from './components/StateProvider';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
