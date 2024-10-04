import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Profile() {
    const cn = bem('Profile');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetch('/api/v1/users/self?fields=*', {
                headers: { 'X-Token': token }
            })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setProfile(data.result);
                } else {
                    setError('Не удалось загрузить профиль');
                }
            })
            .catch(() => setError('Ошибка загрузки профиля'));
        }
    }, [navigate]);

    if (error) return <p>{error}</p>;
    if (!profile) return <p>Загрузка...</p>;

    return (
        <div className={cn()}>
            <h2 className={cn('title')}>Профиль</h2>
            <div className={cn('prop')}>
                <div className={cn('label')}>Имя:</div>
                <div className={cn('value')}>{profile.profile.name}</div>
            </div>
            <div className={cn('prop')}>
                <div className={cn('label')}>Телефон:</div>
                <div className={cn('value')}>{profile.profile.phone}</div>
            </div>
            <div className={cn('prop')}>
                <div className={cn('label')}>Email:</div>
                <div className={cn('value')}>{profile.email}</div>
            </div>
        </div>
    );
}

export default memo(Profile);
