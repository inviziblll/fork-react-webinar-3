import { memo, useCallback, useEffect, useState } from 'react';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import PageLayout from '../../components/page-layout';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductCard from '../../components/product-card';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Product() {
  const store = useStore();
  const { id } = useParams();
  
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.item,
  }));

  const cn = bem('Product');

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  useEffect(() => {
    store.actions.product.load(id);
    store.actions.modals.close();
  }, [store, id]);


  if (select.loading) {
    return <div className={cn()}> Загрузка... </div>;
  }

  if (!select.product) {
    return (
        <PageLayout>
          <Head title='404'/>
          <div className={cn()}> Товар не найден </div>;
        </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ProductCard product={select.product} onAdd={callbacks.addToBasket} loading={select.loading}/>
    </PageLayout>
  );
}

export default Product;
