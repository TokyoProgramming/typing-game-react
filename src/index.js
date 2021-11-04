import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TimerProvider } from './context/TimerContext';

ReactDOM.render(
  <TimerProvider>
    <App />
  </TimerProvider>,
  document.getElementById('root')
);
