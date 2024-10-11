import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentAuth({ button = false, onCancel, t}) {
  
  const cn = bem('CommentAuth');
  
  return (
    <div className={cn()}>
      
      <Link className={cn('link')} to="/login">{t('notauth.login')}</Link>
      
      <div className={cn('text')}>{t('notauth.comment')}</div>
      
      {button  && 
        (
          <button className={cn('button')} onClick={onCancel}>
              {t('notauth.cancel')}
          </button>             
        )
      }

    </div>
  );

}

export default memo(CommentAuth);
