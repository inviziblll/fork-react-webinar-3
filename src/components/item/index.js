import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural, priceFormat } from '../../utils';
import './style.css';

function Item(props) {
  const action = (e) => { 
      e.stopPropagation();
      props.action(props.item.code);
  };

  return (
    <div className="Item">

      <div className="Item-code">{props.item.code}</div>

      <div className="Item-content">
          <div className="Item-title">{props.item.title}</div>
          <div className="Item-price">
                {priceFormat(props.item.price)} ₽
                {props.item.quantity ? <span className="Item-quantity">{props.item.quantity} шт</span> : ''}
          </div>
      </div>
     
      <div className="Item-actions">
          <button onClick={action}>{props.buttonName}</button>
      </div>

    </div>
  ); 
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  action: PropTypes.func
};

export default React.memo(Item);
