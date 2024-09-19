import React, { useState } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import { plural } from '../../utils';
import './style.css'; 

function Cart({ cart, onRemoveProduct}) { 

    const [isModal, setIsModal] = useState(false); 

    const onOpenModal = e => {
        setIsModal(true);
    };
      
    const onCloseModal = () => {
        setIsModal(false);
    };

    const CartPoducts = cart.reduce((sum, item) => sum + item.quantity, 0);
    const CartPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const showProducts = (CartPoducts) => {
        let str = plural(CartPoducts, { one: 'товар', few: 'товара', many: 'товаров' });
        return str = str + ' / ' + CartPrice + ' ₽';
    };

    return (

        <div className="Cart-Panel">
                B корзине: 
                {CartPoducts > 0
                    ? <div className='Cart-items'>{CartPoducts} {showProducts(CartPoducts)} </div>
                    : <div className='Cart-items'>пусто</div>
                }
                <button onClick={onOpenModal}>Перейти</button>


                {isModal === true
                    ? <div className="Cart">

                        <div className="Cart-content">
                            
                            <div className="Cart-header">
                                <h2>Корзина</h2>
                                <div className='Controls'><button onClick={onCloseModal}>Закрыть</button></div>
                            </div>

                           
                            <List list={cart} action={onRemoveProduct} buttonName="Удалить" />
        
                            <div className="Cart-total-price">
                                <div className="Cart-total-title">Итого</div>
                                <div className="Cart-total-sum">{CartPrice} ₽</div>
                            </div>

                        </div>

                    </div>
                    : ''
                }
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