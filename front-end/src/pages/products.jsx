import PropTypes, { object } from 'prop-types';
import React from 'react';
import Navbar from '../components/Navbar';
import ProductsCards from '../components/ProductsCards';

export default class Products extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Navbar history={ this.props } />
        <ProductsCards history={ history } />
      </div>
    );
  }
}

Products.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};
