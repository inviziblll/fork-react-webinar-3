import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cartitem from '../cartitem';
import { plural, priceFormat } from '../../utils';
import './style.css'; 

function Cart({ cart, onRemoveProduct}) { 

    if(cart.length == 0){
        return (
            <div className="Cart-empty"><h3>Ваша корзина пуста</h3></div>
        );
    }

    const CartPrice = cart.reduce((sum, item) => sum + item.price, 0);
    return (
        <div className="Cart">
                {cart.map(item => (
                        <div key={item.code} className="Cartlist-item">
                            <Cartitem item={item} action={onRemoveProduct} buttonName="Удалить" />
                        </div>
                    ))
                }

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