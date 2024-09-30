import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import { numberFormat, plural } from '../../utils';
import './style.css';

function MenuMain({ langSettings }) {
  const cn = bem('MenuMain');

  const navigate = useNavigate();

  const callbacks = {
    onHome: useCallback( () => { // Возвращение на главную страницу
        navigate('/');
    },[]),
  };
  
  return (
      <span className='MenuMain-home' onClick={callbacks.onHome}>{langSettings.MainPage}</span> 
  );
}

MenuMain.propTypes = {
  langSettings: PropTypes.object,
};

// BasketTool.defaultProps = {
//   onOpen: () => {},
//   sum: 0,
//   amount: 0,
// };

export default memo(MenuMain);
