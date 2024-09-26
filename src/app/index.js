import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Product from './product';
/**
 * Приложение
 * @returns {React.ReactElement} 
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter> 
  );
} 
export default App;
