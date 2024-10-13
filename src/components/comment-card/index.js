import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import dateFormat from '../../utils/date-format';
import Comments from '../comments'; 

import './style.css';

function CommentCard({comment, onCancel, auth, t, onOpen, user}) {
	const { author, text, children, dateCreate, isDeleted, _id } = comment;
	const cn = bem('CommentCard');

	const authdAthor = () => {
		let result = (user._id == author._id) ? 'CommentCard-author CommentCard-authorized-author' : 'CommentCard-author';
		return result;
	}
 
	return (
	    
	    <div className={cn()}>	      	
	      	<div className={cn('heading')}>
		        <div className={authdAthor()}>{author.profile.name}</div>
		        <div className={cn('date')}>{dateFormat(dateCreate)}</div>
		    </div>

		    <div className={cn('text')}>{ isDeleted ? t('comment.deleted') : text}</div>

		    <button className={cn('reply')} onClick={(e) => { onOpen(_id)}}>
		        {t('comment.reply')}
		    </button> 
		    
	    </div>
	);
}


export default memo(CommentCard);
