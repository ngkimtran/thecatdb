import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './context'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router basename="/thecatdb" >
    <AppProvider>
      <App />
    </AppProvider>
  </Router>,
  document.getElementById('root')
);
