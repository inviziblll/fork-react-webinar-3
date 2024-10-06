import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../hooks/use-store';
import { Link, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginPanel({t}) {
  
  const cn = bem('LoginPanel');
  const navigate = useNavigate();
  const store = useStore();   

  useEffect(() => {
        const getProfile = async () => {
            await store.actions.user.profile(t);
        };
        getProfile();
  }, [store.actions.user]);

  const profile = useSelector(state => ({
        name:  state.user.name,
        email: state.user.email,
        phone: state.user.phone,
        error: state.user.error,
  })); 

  const handleLogout = async () => {
        await store.actions.user.logout(t);
        navigate('/login');
        window.location.reload();
  };

  const handleLogin = async () => {
        navigate('/login');
  };


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

export default memo(LoginPanel);
