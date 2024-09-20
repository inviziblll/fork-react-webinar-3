import React, { useState } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import { plural, priceFormat } from '../../utils';
import './style.css'; 

function Cart({ cart, onRemoveProduct}) { 

    const CartPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (

        <div>                            
                    
            <List list={cart} action={onRemoveProduct} buttonName="Удалить" />
                
            <div className="Cart-total-price">
                <div className="Cart-total-title">Итого</div>
                <div className="Cart-total-sum">{priceFormat(CartPrice)} ₽</div>
            </div>

        </div>
    );
}

Cart.propTypes = { 
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number,
            title: PropTypes.string,
            price: PropTypes.number,
            quantity: PropTypes.number,
        }),
    ).isRequired,
    onRemoveProduct: PropTypes.func.isRequired
};

export default React.memo(Cart);