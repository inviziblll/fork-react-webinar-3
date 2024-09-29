import { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../store/use-selector';
import './style.css';

function ProductCard({product, onAdd, langSettings}) { 
  
  const cn = bem('ProductCard');
  
  const navigate = useNavigate();

  const callbacks = {
    onAddToBasket: e => onAdd(product._id), // Добавление в корзину 
    onHome: useCallback( () => { // Возвращение на главную страницу
        navigate('/');
    },[]),
  };

  return (
    <div className={cn()}>
          <div className={cn('content')}>{product.description}</div>
          
          <div className={cn('param')}>
            {langSettings.ManufacturerCountry}: <strong>{product.madeIn.title}</strong>
          </div>

          <div className={cn('param')}>
             {langSettings.Category}: <strong>{product.category.title}</strong>
          </div>

          <div className={cn('param')}>
            {langSettings.Release}: <strong>{product.edition}</strong>
          </div>

          <div className={cn('price')}>
            {langSettings.Price}:&nbsp;&nbsp;&nbsp;{product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
          </div>

          <button className={cn('button')} onClick={callbacks.onAddToBasket}>{langSettings.Add}</button>
          
    </div>
  );
}
export default memo(ProductCard); 
