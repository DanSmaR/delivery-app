import React from 'react';
import { requestData } from '../helpers/instance';

class ProductsCards extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      qtd: {},
      // cart: [],
    };
  }

  componentDidMount() {
    this.fetchProducts('products');
  }

  fetchProducts = async (endpoint) => requestData(endpoint)
    .then((response) => this.setProducts(response))
    .catch((error) => console.log(error));

  setProducts = (products) => this.setState({ products });

  addQuantity = (id) => {
    const { qtd } = this.state;
    if (!qtd[id]) {
      this.setState((previousState) => (
        { qtd: { ...previousState.qtd, [id]: { quantity: 1 } } }
      ));
    } else {
      this.setState((previousState) => (
        { qtd:
           { ...previousState.qtd,
             [id]: { quantity: previousState.qtd[id].quantity + 1 },
           },
        }
      ));
    }
  };

  subQuantity = (id) => {
    const { qtd, products } = this.state;
    if (qtd[id] && qtd[id].quantity > 0) {
      this.setState((previousState) => (
        { qtd:
           { ...previousState.qtd,
             [id]: { quantity: previousState.qtd[id].quantity - 1 },
           },
        }
      ));
    }
    console.log(products);
  };

  /*  cart: [
    {
      id,
      name,
      quantity
      price,
      imageUrl,
    }
  ] */

  onInputChange = (id) => {
    const { qtd } = this.state;
    const newCard = {
      quantity: qtd[id].quantity,
    };
    console.log(newCard);
  };

  render() {
    const { products, qtd } = this.state;

    return (
      <>
        { products.map((product) => {
          const { id, name, price, urlImage } = product;
          const priceReplaced = price.replace('.', ',');

          return (
            <div key={ id } className="individual-cards">
              <p data-testid={ `customer_products__element-card-price-${id}` }>
                { priceReplaced }
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
                  id={ `add-${id}` }
                  onClick={ () => this.addQuantity(id) }
                  data-testid={ `customer_products__button-card-add-item-${id}` }
                >
                  +
                </button>
                <input
                  type="text"
                  name="qtd"
                  className="inputQtd"
                  id={ `input-${id}` }
                  value={ qtd[id] ? qtd[id].quantity : 0 }
                  onChange={ () => this.onInputChange(id) }
                  data-testid={ `customer_products__input-card-quantity-${id}` }
                />
                <button
                  type="button"
                  id={ `rm-${id}` }
                  data-testid={ `customer_products__button-card-rm-item-${id}` }
                  onClick={ () => this.subQuantity(id) }
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
