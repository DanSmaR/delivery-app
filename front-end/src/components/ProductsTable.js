import React from 'react';
import PropTypes from 'prop-types';
import ProductTableLine from './ProductTableLine';

class ProductsTable extends React.Component {
  render() {
    const { selectedProductsList, checkout, onDeleteItem } = this.props;
    return (
      <div className="table-wrap">
        {
          selectedProductsList.length > 0 ? (
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
                      checkout={ checkout }
                      onDeleteItem={ onDeleteItem }
                      listItems={ array }
                    />
                  ))
                }
              </tbody>
            </table>
          ) : (<h3>Carrinho Vazio</h3>)
        }
      </div>
    );
  }
}

ProductsTable.propTypes = {
  selectedProductsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
  })).isRequired,
  checkout: PropTypes.bool,
  onDeleteItem: PropTypes.func,
};

ProductsTable.defaultProps = {
  checkout: false,
  onDeleteItem: () => {},
};

export default ProductsTable;
