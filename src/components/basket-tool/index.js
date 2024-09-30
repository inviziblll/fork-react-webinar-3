import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import { numberFormat, plural } from '../../utils';
import MenuMain from '../menu-main';
import './style.css';

function BasketTool({ sum, amount, onOpen, langSettings }) {
  const cn = bem('BasketTool');

  const navigate = useNavigate();

  const callbacks = {
    onHome: useCallback( () => { // Возвращение на главную страницу
        navigate('/');
    },[]),
  };
  
  return (
    <div className={cn()}>
      <MenuMain langSettings={langSettings}/>
      <div className='BasketTool-content'>
        <span className={cn('label')}>{langSettings.CartHas}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: langSettings.One,
              few: langSettings.Few,
              many: langSettings.Many,
              })} / ${numberFormat(sum)} ₽`
            : `${langSettings.CartEmpty}`}
        </span>
        <button onClick={onOpen}>{langSettings.Move}</button>
      </div>
      

    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

// BasketTool.defaultProps = {
//   onOpen: () => {},
//   sum: 0,
//   amount: 0,
// };

export default memo(BasketTool);
