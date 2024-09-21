import React, { useState, useCallback, useEffect } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout'; 
import Modal from './components/modal';
import Cartpanel from './components/cartpanel';
import Cart from './components/cart';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const сartPoducts = store.getState().сartPoducts;
  const сartPrice = store.getState().сartPrice;


  const [isModal, setIsModal] = useState(false); 

  const callbacks = {

    // cart
    onAddToCart: useCallback(
      code => {
        store.addProduct(code);
      },
      [store],
    ),

    onRemoveProduct: useCallback(
      code => {
        store.removeProduct(code);
      },
      [store],
    ),

    onOpenModal: useCallback(() => {
      setIsModal(true);
    }, []),

    onCloseModal: useCallback(() => {
      setIsModal(false);
    }, []),

  };

  const cartComponent = <Cart cart={cart} onRemoveProduct={callbacks.onRemoveProduct} />; // компонент корзина

  return (
    <PageLayout>
      
      <Head title="Магазин" />

      <Cartpanel сartPoducts={сartPoducts} сartPrice={сartPrice} onOpenModal={callbacks.onOpenModal}/>
      
      {isModal === true 
        ? <Modal isModal={isModal} onCloseModal={callbacks.onCloseModal} childComponent={cartComponent} modalName="Корзина"/> 
        : ''
      }

      <List list={list} action={callbacks.onAddToCart} buttonName="Добавить"/>

    </PageLayout>
  );
}

export default App;
