import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const Root = () => {
  return <App />;
};

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
