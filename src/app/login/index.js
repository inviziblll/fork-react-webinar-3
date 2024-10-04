import { memo, useState, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LoginForm from '../../components/login-form';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../hooks/use-store';
import { Link, useNavigate } from 'react-router-dom';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';

function Login({t}) {

    const store = useStore();
    const navigate = useNavigate();
    const [error, setError] = useState('');


    const handleForm = async (login, password) => {
        try {
            await store.actions.user.sign(login, password, t); 
        } 
        catch (e) {
            setError(e.message);
        } 
    };

    const select = useSelector(state => ({
        auth: state.user.auth,
        error: state.user.error,
    })); 


    const handleSuccess = () => {
        navigate('/profile');
    };

    useEffect(() => {
        if (select.auth) {
           handleSuccess();
        }

        if (select.error) {
           setError(select.error);
        }
    }, [select.auth, select.error]);

    return (
        <PageLayout>
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <LoginForm handleForm={handleForm} t={t} error={error} />
        </PageLayout>
    );
}

export default memo(Login);
