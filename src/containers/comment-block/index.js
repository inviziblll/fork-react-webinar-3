import {useMemo, useState } from 'react';
import commentActions from "../../store-redux/comment/actions";
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import { useParams } from 'react-router-dom';
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import Comments from '../../components/comments'; 

function CommentBlock({ comments, addComment, auth, articleId, t }) { 


  const callbacks = {

    onAddComment: (text, comment) => {
      let type = (comment === false) ? 'article': 'comment';
      if(comment){
          type = (Object.keys(comment.parent).length === 0) ? 'article': 'comment';
      }
      let commentID = comment?.parentId || articleId; // если нет id комментария берем articleId
      let params = {
          parent: {
            _type: type, 
            _id: commentID, 
          },
          text
      }
      addComment(params);
    }
  }

  const commentsTree = useMemo(() => { 
        const list = comments.map((item) => {
            if (item?.parent?._type === "article"){
               item.parent = {};
            }

            item.parentId = null;

            if(item.parent?._id !== null){
               item.parentId = item.parent?._id;
            }else{
              item.parentId = articleId;
            }

            return item;
        });

        return treeToList(listToTree(list), (item, level) => ({
            ...item,
            count: level
        }));
  });

  return (
      <>
        <Comments 
          comments={commentsTree} 
          onAdd={callbacks.onAddComment} 
          auth={auth}  
          t={t} 
          parentId={articleId}
          child={false}
        />
      </>
  );

}

export default CommentBlock;
