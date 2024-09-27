import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils'; 
import { useNavigate } from 'react-router-dom';
import './style.css';

function Item({item, onAdd, onProduct, langSettings}) {

  const cn = bem('Item');
  
  const navigate = useNavigate();
  const callbacks = {
    onAdd: e => onAdd(item._id),
    onProduct: e => onProduct(item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')} onClick={callbacks.onProduct}>{item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{langSettings.Add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

// Item.defaultProps = {
//   onAdd: () => {},
// };
export default memo(Item);
