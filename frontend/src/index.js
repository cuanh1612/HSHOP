import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store'
import {Provider} from 'react-redux'
import './index.css'

import {positions, transitions, Provider as AleartProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AleartProvider template={AlertTemplate} {...options}>
      <App />
    </AleartProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
