import React from 'react';
import PropTypes from 'prop-types';
import ProductTableLine from './ProductTableLine';

class ProductsTable extends React.Component {
  render() {
    const { selectedProductsList, checkout, onDeleteItem } = this.props;
    return (
      <div className="table-wrap">
        <table className="table">
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
              selectedProductsList.map((product, index, array) => (
                <ProductTableLine
                  key={ product.id }
                  item={ product }
                  index={ index }
                  checkout
                  onDeleteItem={ onDeleteItem }
                  listItems={ array }
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
  selectedProductsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  checkout: PropTypes.bool.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default ProductsTable;
