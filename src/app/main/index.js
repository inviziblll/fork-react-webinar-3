import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/pagination';


function Main() {
  const store = useStore(); 
  const navigate = useNavigate(); 
  const limit = 10; // число записей на странице

  useEffect(() => {
    store.actions.catalog.load(limit);
  }, []);


  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activePage:state.catalog.activePage,
    count: state.catalog.count,
    pages:state.catalog.pages
  }));


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    onChangePage: useCallback((number) => { // Переход на другую страницу
        store.actions.catalog.setActivePage(number)
        store.actions.catalog.load(limit);
    }),

    onProductDetail: useCallback(id => navigate(`/product/${id}`)), // Переход в карточку товара

  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} onProduct={callbacks.onProductDetail}/>;
      },
      [callbacks.addToBasket],
    ),
  };


  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      {select.pages > 0 
          ? <Pagination onPageChange={callbacks.onChangePage} activePage={select.activePage} pages={select.pages}/> 
          :''
      }
    </PageLayout>
  );
}

export default memo(Main);
