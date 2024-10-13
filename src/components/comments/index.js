import { memo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentCard from '../comment-card';
import CommentForm from '../comment-form';
import CommentAuth from '../comment-auth';
import './style.css';

function Comments({comments, count, onAdd, parentId, t, auth, child, user}) {  
    
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

    const formBlock = useRef(false); // ссылка на блок формы под комментарием
    useEffect(() => {
        if (openForm && formBlock.current) {
                formBlock.current.scrollIntoView({behavior: 'smooth', block: 'center'}); // скроллинг блока формы
        }
    }, [openForm]);


    const renderChildrenComments = function (comments, commentId, level, formBlock){ // дочерние комментарии 

        const childrenComments = comments.filter((item) => ( 
            item.parent._id === commentId
        ));

        if(childrenComments.length>0){

            const mimLevel = 2;
            const maxLevel = 7;

            const makeOffset =  (commentLevel) => { // делаем дополнительный отступ для вложенных комментариев 
                // ограничеваем отступ при большой вложенности
                let offset = (commentLevel <= maxLevel && commentLevel >= mimLevel)? true : false;
                return offset;
            }        

            let commentLevel = level;
                level = level + 1; // добавляем вложенность для отступа дочернего комментария

            const result = childrenComments.map((comment) => (

                    <li key={comment._id}>

                        <CommentCard  
                            comment={comment}  
                             onCancel={handleCancel} 
                            auth={auth} 
                            t={t} 
                            onOpen={id => handleOpen(id)}
                            user={user}
                        />
                        
                        {renderChildrenComments(comments, comment._id, level, formBlock)}

                        {openForm === comment._id && 
                            (
                            <>{renderFormBlock(comment, formBlock)}</>
                            )
                        }
                    </li>
            ));

            if(makeOffset(commentLevel) === true){
                return (
                    <ul className='Comments-list Comments-offset'>{result}</ul>
                );
            }
            else{
                if(commentLevel>maxLevel){                    
                    return (
                        <ul className='Comments-offset-reset'>{result}</ul>
                    );
                }
                else{
                    return (
                        <ul className={cn('list')}>{result}</ul>
                    );
                }
            }
            
        }

    }

    
    const renderRootComments = function(comments, formBlock){
            
            // комментарии у которых нет родителя
            const rootComments = comments.filter((item) => ( 
                    Object.keys(item.parent).length === 0
            )); 

            const level = 1; // уровень вложенности 
            const result = rootComments.map((comment) => ( // вывод родительских комментариев
                    
                    <li key={comment._id}>
                        <CommentCard  
                            comment={comment}  
                            onCancel={handleCancel} 
                            auth={auth} 
                            t={t} 
                            onOpen={id => handleOpen(id)}
                            user={user}

                        />
                        
                        {renderChildrenComments(comments, comment._id, level, formBlock)} 

                        {openForm === comment._id && 
                            (
                            <>{renderFormBlock(comment, formBlock)}</>
                            )
                        }

                    </li>
            ));

            return (<ul className={cn('list')}>{result}</ul>);
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
                    <div className='Comments-bottom' ref={formBlock}>
                        <CommentForm onAdd={onAdd} t={t} 
                        parentId={parentId} onCancel={handleCancel} 
                        type="bottom"
                        formTitle = {t('comment.form.newcomment')}/>
                    </div>
                );
            }
            
        }
    };


    const renderFormBlock = function (comment, formBlock) { // вывод формы в кнопке комментария
        
        if(auth){
                
                return(
                    <div ref={formBlock}>
                        <CommentForm
                            onAdd={onAdd}
                            t={t}
                            parentId={parentId}
                            onCancel={handleCancel}
                            comment={comment}
                            formTitle = {t('comment.form.newreply')}
                            type="comment"
                        />
                    </div>
                );
        }

        if(!auth){
            return  (
                <div className={cn()}> <CommentAuth button={true}onCancel={handleCancel}  t={t}/>  </div>);
        }
    };

    return (
        <div className={cn()}>
            <h2 className={cn('heading')}>{t('comment.heading')} ({count})</h2>
            {renderRootComments(comments, formBlock)}
            {renderBottomForm()}
        </div>
    );
}

export default memo(Comments);
