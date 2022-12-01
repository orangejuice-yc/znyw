import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";
import {ConnectedRouter} from 'connected-react-router'
import Routes from './Routes';
import { API } from './config'
import store from './store/index'
import { history } from './store'

console.log(API)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//
//         <Routes/>
//
//     </Provider>
//   </React.StrictMode>
// );
root.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router>
          <Routes />
        </Router>
      </ConnectedRouter>
    </Provider>
);