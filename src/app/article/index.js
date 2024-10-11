import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import shallowequal from 'shallowequal';

import articleActions from '../../store-redux/article/actions';
import commentActions from "../../store-redux/comment/actions";

import CommentBlock from '../../containers/comment-block';

import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useSelector from '../../hooks/use-selector';

function Article() {
  const store = useStore(); 

  const dispatch = useDispatch();
  const params = useParams();
  
  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentActions.load(params.id));
  }, [params.id]);

  
  const select = useSelectorRedux(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comment.items,
      waitingComments: state.comment.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект


  const {auth, userName} = useSelector(
    state => ({
      auth: state.session.exists
    }),
  );
  
  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

    // Добавление нового комментария
    addComment: useCallback((data) => {
      dispatch(commentActions.addComment(data));
      dispatch(commentActions.load(params.id)); // загружаем заново список комментариев 
    }, 
    [dispatch, params.id]),
  };

    
  return (
    <PageLayout>
      
      <TopHead />
      
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>

      <Navigation />

      <Spinner active={select.waiting}>
          <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>

      <Spinner active={select.waitingComments}>
          <CommentBlock 
            comments={select.comments} 
            addComment={callbacks.addComment} 
            auth={auth} 
            articleId={params.id} 
            t={t}
          />
      </Spinner>

    </PageLayout>
  );
}

export default memo(Article);
