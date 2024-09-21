import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural, priceFormat } from '../../utils';
import './style.css';

function Cartitem({ item, action, buttonName }) {

  const removeProduct = (e) => { 
      e.stopPropagation();
      action(item.code);
  };

  return (
    <div className="Cartitem">
      <div className="Cartitem-code">{item.code}</div>
      <div className="Cartitem-content">
          <div className="Cartitem-title">{item.title}</div>
          <div className="Cartitem-price">
                {priceFormat(item.price)} ₽
                <span className="Cartitem-quantity">{item.quantity} шт</span>
          </div>
      </div>
      <div className="Cartitem-actions">
          <button onClick={removeProduct}>{buttonName}</button>
      </div>
    </div>
  ); 
}

Cartitem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  action: PropTypes.func
};

export default React.memo(Cartitem);
