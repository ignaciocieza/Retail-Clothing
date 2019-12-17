import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; //(*)
import App from './ui/layouts/App';
import { store, persistor } from './api/store';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './indexTheme.styles';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

serviceWorker.register();//petcion para que funcione como PWA