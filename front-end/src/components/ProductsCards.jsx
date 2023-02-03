import PropTypes, { object } from 'prop-types';
import React from 'react';
import { requestData } from '../helpers/instance';
import Button from './Button';

class ProductsCards extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      qtd: {},
      cart: [],
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
      ), () => this.onInputChange(id));
    } else {
      this.setState((previousState) => (
        { qtd:
          { ...previousState.qtd,
            [id]: { quantity: previousState.qtd[id].quantity + 1 },
          },
        }
      ), () => this.onInputChange(id));
    }
  };

  subQuantity = (id) => {
    const { qtd } = this.state;
    if (qtd[id] && qtd[id].quantity > 0) {
      this.setState((previousState) => (
        { qtd:
          { ...previousState.qtd,
            [id]: { quantity: previousState.qtd[id].quantity - 1 },
          },
        }
      ), () => this.onInputChange(id));
    }
  };

  onInputChange = (id) => {
    const { qtd: { [id]: { quantity } }, products } = this.state;
    const [product] = products.filter(({ id: pId }) => pId === id);
    const newCart = {
      id: product.id,
      description: product.name,
      price: Number(product.price).toFixed(2),
      quantity,
      totalPrice: (Math.round(product.price * quantity * 100) / 100).toFixed(2),
    };

    this.cartSetState(id, newCart);
  };

  handleManualInputChange = (id, e) => {
    this.setState((previousState) => (
      { qtd:
        { ...previousState.qtd,
          [id]: { quantity: +e.target.value },
        },
      }
    ), () => this.onInputChange(id));
  };

  cartSetState = (id, newCart) => this.setState((previousState) => {
    const prev = previousState.cart.filter(({ id: pId }) => pId !== id);

    return newCart.quantity === 0
      ? this.rmCartState(prev)
      : this.addCartState(prev, newCart);
  }, () => this.cartToLocalStorage());

  addCartState = (prev, curr) => ({ cart: [...prev, curr] });

  rmCartState = (prev) => ({ cart: [...prev] });

  totalPriceCart = () => {
    const { cart } = this.state;

    if (cart.length !== 0) {
      const total = cart.map(({ totalPrice }) => Number(totalPrice))
        .reduce((acc, curr) => acc + curr).toFixed(2);
      const totalReplaced = total.replace('.', ',');
      return totalReplaced;
    }
    return 0;
  };

  cartToLocalStorage = () => {
    const { cart } = this.state;
    return cart.length > 0
      ? localStorage.setItem('cart', JSON.stringify(cart))
      : localStorage.removeItem('cart');
  };

  handleRedirectToCheckout = () => {
    const { history } = this.props;
    history.push('/customer/checkout');
  };

  handleButtonDisable = () => {
    const { cart } = this.state;

    return cart.length === 0;
  };

  displayCart = () => {
    const total = this.totalPriceCart();
    return (
      <Button
        ariaLabel="Preço Total do Carrinho"
        dataTestId="customer_products__button-cart"
        onAction={ this.handleRedirectToCheckout }
        onCheckIsDisabled={ this.handleButtonDisable }
        // className="display-cart-button"
      >
        R$
        {' '}
        <span data-testid="customer_products__checkout-bottom-value">
          {total}
        </span>
      </Button>
    );
  };

  render() {
    const { products, qtd } = this.state;

    return (
      <>
        <div className="cards">
          { products.map((product) => {
            const { id, name, price, urlImage } = product;
            const priceReplaced = price.replace('.', ',');
            return (
              <div key={ id } className="individual-cards">
                <p data-testid={ `customer_products__element-card-price-${id}` }>
                  { `R$ ${priceReplaced}` }
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
                    aria-label="Aumentar quantidade do produto"
                    type="button"
                    id={ `add-${id}` }
                    onClick={ () => this.addQuantity(id) }
                    data-testid={ `customer_products__button-card-add-item-${id}` }
                  >
                    +
                  </button>
                  <input
                    aria-label="quantidade do produto"
                    type="number"
                    name="qtd"
                    className="inputQtd"
                    defaultValue={ 0 }
                    min={ 0 }
                    id={ `input-${id}` }
                    value={ qtd[id] && qtd[id].quantity }
                    data-testid={ `customer_products__input-card-quantity-${id}` }
                    onChange={ (e) => this.handleManualInputChange(id, e) }
                  />
                  <button
                    aria-label="Diminuir quantidade do produto"
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
        </div>
        <div className="display-cart">
          { this.displayCart() }
        </div>
      </>
    );
  }
}

ProductsCards.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default ProductsCards;
