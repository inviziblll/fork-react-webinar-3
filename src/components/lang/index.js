import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Lang({onLangChange, lang }) {
    const cn = bem('Lang');
	const active = (btnLang) =>{
		if(lang === btnLang){
			return 'Lang-active';
		}
	};
	return (
	    <div className={cn()}>
	        <button className={active('en')} onClick={() => onLangChange('en')}>En</button>
	        <button className={active('ru')} onClick={() => onLangChange('ru')}>Ru</button>
	    </div>
	);
}

Lang.propTypes = {
  onLangChange:PropTypes.func,
};

export default memo(Lang);
