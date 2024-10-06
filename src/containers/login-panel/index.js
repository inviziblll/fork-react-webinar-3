import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../hooks/use-store';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import { cn as bem } from '@bem-react/classname';
import LoginBar from '../../components/login-bar';

function LoginPanel({t}) {
  
  const store = useStore(); 

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
        const getProfile = async () => {
            await store.actions.profile.fields(t);
        };
        getProfile();
  }, [store.actions.profile]); 

  const profile = useSelector(state => ({
        name:  state.profile.name,
        email: state.profile.email,
        phone: state.profile.phone,
        error: state.profile.error,
  })); 

  const handleLogout = async () => {
        await store.actions.user.logout(t);
        await store.actions.profile.logout(t);
        window.location.reload();
  };

  const handleLogin = async () => { // путь из браузерной строки со всеми параметрами 
      navigate('/login', {state: {previouspage: window.location.pathname + window.location.search}});
  };

  return (
    <LoginBar t={t} profile={profile} handleLogout={handleLogout} handleLogin={handleLogin} />
  );
}

export default memo(LoginPanel);
