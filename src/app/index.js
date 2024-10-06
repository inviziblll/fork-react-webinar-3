import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import useTranslate from '../hooks/use-translate';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import { Link, useNavigate, useLocation } from 'react-router-dom';
/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  const { t } = useTranslate();
  
  // обработка формы авторизации, перенес из Login
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const handleLoginForm = async (login, password) => {
        try {
           await store.actions.user.sign(login, password, t, handleLogin); 
        } 
        catch (e) {
            console.log(e.message);
        } 
  }
  const handleLogin = function(signSuccess = false, signError = false){
        if(signSuccess){
            handleSuccess(); 
        }
        if(signError){
            setError(signError); // выставляем ошибку
        }
  }
  const handleSuccess = () => { // редирект на страницу с которой пользователь зашел
        let previouspage = '/profile';
        if(location.state !== null){
            previouspage = location.state.previouspage;
        }
        navigate(previouspage, { replace: true });
  }

  return ( 
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login t={t} error={error} handleLoginForm={handleLoginForm} />} />
        <Route path={'/profile'} element={<Profile t={t} />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
