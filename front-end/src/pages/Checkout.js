import React from 'react';
import DeliveryForm from '../components/DeliveryForm';
import ProductsTable from '../components/ProductsTable';

class Checkout extends React.Component {
  render() {
    return (
      <main>
        <section>
          <h1>Finalizar Pedido</h1>
          <ProductsTable selectedProductsList={ selectedProductsList } checkout />
        </section>
        <section>
          <h2>Detalhes e Endereço para Entrega</h2>
          <DeliveryForm sellersList={ sellers } />
        </section>
      </main>
    );
  }
}

export default Checkout;
