import React from 'react';
import { requestData } from '../helpers/instance';

class ProductsCards extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.fetchProducts('products');
  }

  fetchProducts = async (endpoint) => requestData(endpoint)
    .then((response) => this.setProducts(response))
    .catch((error) => console.log(error));

  setProducts = (products) => this.setState({ products });

  render() {
    const { products } = this.state;
    return (
      <div>
        { products.map((product, index) => {
          const { id, name, price, urlImage } = product;
          return (
            <div key={ id }>
              <p data-testid={ `customer_products__element-card-price-${index + 1}` }>
                { Number(price).toFixed(2) }
              </p>
              <img
                src={ urlImage }
                alt={ name }
                data-testid={ `customer_products__img-card-bg-image-${index + 1}` }
                width="50px"
              />
              <p data-testid={ `customer_products__element-card-title-${index + 1}` }>
                { name }
              </p>
            </div>
          );
        }) }
      </div>
    );
  }
}

export default ProductsCards;
