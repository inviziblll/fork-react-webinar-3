import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginForm({handleForm, t, error}) {
  
  const cn = bem('LoginForm');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
      event.preventDefault();
      handleForm(login, password);
  };

  return (
    <form className={cn()} onSubmit={e => onSubmit(e)}>
      <h2 className={cn('heading')}>{t('user.heading')}</h2>
      <div className={cn('input')}>
          <label htmlFor="login">{t('user.login')}</label>
          <input type="text"  name="login" id="login" className={cn('login')} value={login} onChange={e => setLogin(e.target.value)} required/>
      </div>
      <div className={cn('input')}>
        <label htmlFor="password">{t('user.password')}</label>
        <input type="password" name="password" id="password" className={cn('password')} value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      {error ? <span className={cn('error')}>{error}</span> : ''}
      <button type="submit" className={cn('send')}>{t('user.signin')}</button>
    </form>
  );
}

export default memo(LoginForm);
