import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
  
function CommentForm({ onAdd, onCancel, parentId, t , comment = false}) {   
  
  const cn = bem('CommentForm');
  
  const [text, setText] = useState('');

  const addComment = (e) => {
    e.preventDefault();
    addComment
    
    if (text.trim() !=='') {
        onAdd(text, comment);
        setText('');
    }
  };

  return (
    <form className={cn()} onSubmit={e => addComment(e)}>
      
      <h3 className={cn('heading')}>{t('comment.form.title')}</h3>
      
      <textarea 
        className={cn('textarea')} 
        placeholder={t('comment.form.placeholder')} 
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <div className={cn('buttons')}>
        <button>{t('comment.form.send')}</button>
        <button onClick={(e) => onCancel(parentId)}>{t('comment.form.cancel')}</button>
      </div>

    </form>
  );
}

export default memo(CommentForm);
