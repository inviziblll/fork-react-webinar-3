import { memo, useState, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom'; 
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import ProfileBlock from '../../components/profile-block';
import { cn as bem } from '@bem-react/classname';
import useSelector from '../../hooks/use-selector';
import LoginPanel from '../../containers/login-panel';

function Profile({t}) {

    const cn = bem('Profile');

    const store = useStore();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const getProfile = async () => {
            await store.actions.profile.fields(t);
        };
        getProfile();
    }, [store.actions.profile]);

    const profile = useSelector(state => ({
        name: state.profile.name,
        email: state.profile.email,
        phone: state.profile.phone,
        error:state.profile.error
    })); 

    const token = localStorage.getItem('token');
    if(!token){
        navigate('/login');
    }

    return (
        <PageLayout> 
            <LoginPanel t={t} />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <ProfileBlock t={t} profile={profile}/>
        </PageLayout>
    );
}

export default memo(Profile);
