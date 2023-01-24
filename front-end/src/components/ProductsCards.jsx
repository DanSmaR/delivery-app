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
      <>
        { products.map((product) => {
          const { id, name, price, urlImage } = product;
          return (
            <div key={ id } className="individual-cards">
              <p data-testid={ `customer_products__element-card-price-${id}` }>
                { Number(price).toFixed(2) }
              </p>
              <img
                src={ urlImage }
                alt={ name }
                data-testid={ `customer_products__img-card-bg-image-${id}` }
                width="50px"
              />
              <p data-testid={ `customer_products__element-card-title-${id}` }>
                { name }
              </p>
              <div>
                <button
                  type="button"
                  data-testid={ `customer_products__button-card-add-item-${id}` }
                >
                  +
                </button>
                <input
                  type="text"
                  name="qtd"
                  id="qtd"
                  defaultValue={ 0 }
                  data-testid={ `customer_products__input-card-qtd-${id}` }
                />
                <button
                  type="button"
                  data-testid={ `customer_products__button-card-rm-item-${id}` }
                >
                  -
                </button>
              </div>
            </div>
          );
        }) }
      </>
    );
  }
}

export default ProductsCards;
