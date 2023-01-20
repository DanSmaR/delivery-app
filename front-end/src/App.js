import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Products from './pages/products';
import './App.css';
import Login from './pages/login';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/login" exact component={ Login } />
      <Route path="/products" component={ Products } />
    </Switch>
  );
}

export default App;
