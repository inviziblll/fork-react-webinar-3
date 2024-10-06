import { memo, useState, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LoginForm from '../../components/login-form';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../hooks/use-store';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import LoginPanel from '../../containers/login-panel';

function Login({t, error, handleLoginForm}) {

    const handleForm = (login, password) => {
        try {
           handleLoginForm(login, password); 
        } 
        catch (e) {
            console.log(e.message);
        } 
    }
   
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
