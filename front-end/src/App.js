import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Products from './pages/products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Admin from './pages/Admin';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/login" exact component={ Login } />
      <Route path="/register" exact component={ Register } />
      <Route path="/customer/orders/:id" exact component={ OrderDetails } />
      <Route path="/seller/orders/:id" exact component={ OrderDetails } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/checkout" component={ Checkout } />
      <Route path="/customer/orders" component={ Orders } />
      <Route path="/seller/orders" component={ Orders } />
      <Route path="/admin/manage" component={ Admin } />
    </Switch>
  );
}

export default App;
