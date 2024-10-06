import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../hooks/use-store';
import { Link, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import { cn as bem } from '@bem-react/classname';
import LoginBar from '../../components/login-bar';

function LoginPanel({t}) {
  
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

  return (
    <LoginBar t={t} profile={profile} handleLogout={handleLogout} handleLogin={handleLogin} />
  );
}

export default memo(LoginPanel);
