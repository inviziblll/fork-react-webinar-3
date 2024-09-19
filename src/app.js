import React, { useState, useCallback, useEffect } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout'; 
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {

    // cart
    onAddToCart: useCallback(
      code => {
        console.log(code);
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

  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart cart={cart} onRemoveProduct={callbacks.onRemoveProduct}/>
      <List list={list} action={callbacks.onAddToCart} buttonName="Добавить"/>
    </PageLayout>
  );
}

export default App;
