import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Products from './pages/products';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/login" exact component={ Login } />
      <Route path="/register" exact component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/checkout" component={ Checkout } />
    </Switch>
  );
}

export default App;
