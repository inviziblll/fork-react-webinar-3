import React, { useState } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import { plural, priceFormat } from '../../utils';
import './style.css'; 

function Cartpanel({ сartPoducts, сartPrice, onOpenModal }) { 

    const showProducts = (сartPoducts, сartPrice) => {
        let str = plural(сartPoducts, { one: 'товар', few: 'товара', many: 'товаров' });
        return str = str + ' / ' + priceFormat(сartPrice) + ' ₽';
    };

    return (

        <div className="Cart-Panel">
                B корзине: 
                {сartPoducts > 0
                    ? <div className='Cart-items'>{сartPoducts} {showProducts(сartPoducts, сartPrice)} </div>
                    : <div className='Cart-items'>пусто</div>
                }
                <button onClick={onOpenModal}>Перейти</button>
         </div>
    );
}

Cartpanel.propTypes = { 
    сartPoducts:PropTypes.number,
    сartPrice:PropTypes.number,
    onOpenModal: PropTypes.func.isRequired,
};

export default React.memo(Cartpanel);