import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, onLangChange, lang}) {
  
	const active = (btnLang) =>{
		if(lang === btnLang){
			return 'Lang-active';
		}
	};

	return (
	    <div className="Head">
	      	<h1>{title}</h1>
	      	<div className='Lang'>
	            <button className={active('en')} onClick={() => onLangChange('en')}>En</button>
	            <button className={active('ru')} onClick={() => onLangChange('ru')}>Ru</button>
	        </div>

	    </div>
	);
}

Head.propTypes = {
  title: PropTypes.node,
  onLangChange:PropTypes.func,
};

export default memo(Head);
