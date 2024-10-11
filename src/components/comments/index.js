import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentCard from '../comment-card';
import CommentForm from '../comment-form';
import CommentAuth from '../comment-auth';
import './style.css';

function Comments({comments, onAdd, parentId, t, auth, child}) { 
    
    const cn = bem('Comments');

    const [bottomForm, setBottomForm] = useState(true);
    const [openForm, setOpenForm] = useState(null);

    const handleOpen = id => {
        setOpenForm(id);
        setBottomForm(false);
    };

    const handleCancel = () => {
        setOpenForm(null);
        setBottomForm(true);
    };

    const handleOnAdd = (text, comment) => {         
        setOpenForm(null);
        setBottomForm(true); 
        onAdd(text, comment);
    };


    const renderChildrenComments = function (comments, commentId){ // дочерние комментарии 

        const childrenComments = comments.filter((item) => ( 
            item.parent._id === commentId
        ));

        if(childrenComments.length>0){

            const result = childrenComments.map(comment => (
                    <li key={comment._id}>
                        <CommentCard  
                            comment={comment}  
                            onAdd={handleOnAdd} 
                            onCancel={handleCancel} 
                            auth={auth} 
                            t={t} 
                            onOpen={id => handleOpen(id)}

                        />
                        {openForm === comment._id && 
                            (
                            <>{renderFormBlock(comment)}</>
                            )
                        }
                        {renderChildrenComments(comments, comment._id)}
                    </li>
            ));
            return (<ul className={cn()}>{result}</ul>);
        }

    }

    
    const renderRootComments = function(comments){
            
            // комментарии у которых нет родителя
            const rootComments = comments.filter((item) => ( 
                    Object.keys(item.parent).length === 0
            ));

            const result = rootComments.map((comment) => ( // вывод родительских комментариев
                    
                    <li key={comment._id}>
                        <CommentCard  
                            comment={comment}  
                            onAdd={handleOnAdd} 
                            onCancel={handleCancel} 
                            auth={auth} 
                            t={t} 
                            onOpen={id => handleOpen(id)}

                        />
                        {openForm === comment._id && 
                            (
                            <>{renderFormBlock(comment)}</>
                            )
                        }

                        {renderChildrenComments(comments, comment._id)}

                    </li>
            ));

            return (<ul className={cn()}>{result}</ul>);
    }

    const renderBottomForm = () => {
        
        if(child === false){

            if(auth === false){
                return (
                    <div className='Comments-bottom'> 
                        <CommentAuth onCancel={handleCancel}  t={t}/> 
                    </div>
                );
            }
            
            if(bottomForm === true){
                return(
                    <div className='Comments-bottom'>
                        <CommentForm onAdd={onAdd} t={t} parentId={parentId} onCancel={handleCancel} />
                    </div>
                );
            }
            else{
                return(
                    <div className='Comments-bottom'>
                        <button className={cn('reply')} onClick={(e) => { setBottomForm(true)}}>
                            {t('comment.reply')}
                        </button> 
                    </div>
                );

            }
        }
    };


    const renderFormBlock = (comment) => { // вывод формы в кнопке комментария
        if(auth){
                return(
                    <CommentForm
                        onAdd={handleOnAdd}
                        t={t}
                        parentId={parentId}
                        onCancel={handleCancel}
                        comment={comment}
                    />
                );
        }

        if(!auth){
            return  (
                <div className={cn()}> <CommentAuth button={true}onCancel={handleCancel}  t={t}/>  </div>);
        }
    };

    return (
        <>
            {renderRootComments(comments)}
            {renderBottomForm()}
        </>
    );
}

export default memo(Comments);
