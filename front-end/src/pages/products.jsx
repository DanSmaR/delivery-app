import React from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import ProductsCards from '../components/ProductsCards';

export default class Products extends React.Component {
  render() {
    return (
      <div>
        <Navbar history={ this.props } />
        <ProductsCards history={ this.props } />
      </div>
    );
  }
}
