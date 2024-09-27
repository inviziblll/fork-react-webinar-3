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
          <p className={cn('home')} onClick={callbacks.onHome}>{langSettings.MainPage}</p>
          <div className={cn('content')}>{product.description}</div>
          
          <div className={cn('param')}>
            {langSettings.ManufacturerCountry}: {product.madeIn.title}
          </div>

          <div className={cn('param')}>
             {langSettings.Category}: {product.category.title}
          </div>

          <div className={cn('param')}>
            {langSettings.Release}: {product.edition}
          </div>

          <div className={cn('param')}>
            {langSettings.Price}: {product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
          </div>

          <button className={cn('button')} onClick={callbacks.onAddToBasket}>{langSettings.Add}</button>
          
    </div>
  );
}
export default memo(ProductCard);
