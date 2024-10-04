import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import './style.css';

function ProfileBlock({t, profile}) {
  
    const cn = bem('ProfileBlock');
    
    return (
        <div className={cn()}>
            <h2 className={cn('heading')}>{t('profile.heading')}</h2>
            <div className={cn('field')}>
                <div className={cn('label')}>{t('profile.name')}:</div>
                <div className={cn('param')}>{profile.name}</div>
            </div>
            
            <div className={cn('field')}>
                <div className={cn('label')}>{t('profile.phone')}:</div>
                <div className={cn('param')}>{profile.phone}</div>
            </div>
            <div className={cn('field')}>
                 <div className={cn('label')}>{t('profile.email')}:</div>
                <div className={cn('param')}>{profile.email}</div>
            </div>
        </div>
  );
}

export default memo(ProfileBlock);
