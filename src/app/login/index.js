import { memo, useState, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LoginForm from '../../components/login-form';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../hooks/use-store';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import LoginPanel from '../../containers/login-panel';

function Login({t}) {

    const store = useStore();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const location = useLocation();
    const handleForm = async (login, password) => {
        try {
           await store.actions.user.sign(login, password, t, handleLogin); 
        } 
        catch (e) {
            consol.log(e.message);
        } 
    };

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
    };

    return (
        <PageLayout>
            <LoginPanel t={t} />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <LoginForm handleForm={handleForm} t={t} error={error} />
        </PageLayout>
    );
}

export default memo(Login);
