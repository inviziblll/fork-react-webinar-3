import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginBar({t, profile, handleLogout, handleLogin}) {
  const cn = bem('LoginPanel');
  if(profile.name){
      return (
        <div className={cn()}>
          <Link className={cn('profile')} to='/profile'>{profile.name}</Link>
          <button onClick={handleLogout}>{t('user.logout')}</button>
        </div>
      );
  }
  else{
      return (
        <div className={cn()}>
          <button onClick={handleLogin}>{t('user.panelbutton')}</button>
        </div> 
      );
  }
}

export default memo(LoginBar);
