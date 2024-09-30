import { memo } from 'react';
import PropTypes from 'prop-types';
import Lang from '../lang';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, onLangChange, lang }) {
    const cn = bem('Head');
	
	return (
	    <div className={cn()}>
	      	<h1>{title}</h1>
	        <Lang onLangChange={onLangChange} lang={lang}/>
	    </div>
	);
}

Head.propTypes = {
  title: PropTypes.node
};

export default memo(Head);
