import React from 'react';
import PropTypes from 'prop-types';
import ProductTableLine from './ProductTableLine';

class ProductsTable extends React.Component {
  render() {
    const { listItems, checkout } = this.props;
    return (
      <div className="table-wrap">
        <table className="table">
          <caption>Checkout Products</caption>
          <thead className="table-head">
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
              {
                checkout && <th>Remover Item</th>
              }
            </tr>
          </thead>
          <tbody className="table-body">
            {
              listItems.map((listItem, index) => (
                <ProductTableLine
                  key={ listItem.id }
                  item={ listItem }
                  index={ index }
                  checkout
                />
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

ProductsTable.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  checkout: PropTypes.bool.isRequired,
};

export default ProductsTable;
