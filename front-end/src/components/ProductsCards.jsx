import React from 'react';
import { requestData } from '../helpers/instance';

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
    const { qtd: { [id]: { quantity } }, products } = this.state;
    const [product] = products.filter(({ id: pId }) => pId === id);
    const newCart = {
      ...product,
      quantity,
      totalPrice: (Number(product.price) * quantity).toFixed(2),
    };

    this.cartSetState(id, newCart);
  };

  cartSetState = (id, newCart) => this.setState((previousState) => {
    const prev = previousState.cart.filter(({ id: pId }) => pId !== id);

    return newCart.quantity === 0
      ? this.rmCartState(prev)
      : this.addCartState(prev, newCart);
  });

  addCartState = (prev, curr) => ({ cart: [...prev, curr] });

  rmCartState = (prev) => ({ cart: [...prev] });

  totalPriceCart = () => {
    const { cart } = this.state;
    const total = cart.map(({ totalPrice }) => Number(totalPrice))
      .reduce((acc, curr) => acc + curr).toFixed(2);
    return total;
  };

  total = () => this.totalPriceCart();

  displayCart = () => {
    const total = this.total();
    return (
      <button type="button">
        {`Ver carrinho ${total}`}
      </button>
    );
  };

  render() {
    const { products, qtd, cart } = this.state;

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
        </div>
        <div className="display-cart">
          { cart.length > 0 && this.displayCart() }
        </div>
      </>
    );
  }
}

export default ProductsCards;
