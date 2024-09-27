import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Basket() { 
  const store = useStore();
  const lang = store.actions.lang; // языковые настройки берем из хранилища
  const langSettings = {
      Delete:lang.getPhrase('Delete'),
      CartTitle:lang.getPhrase('CartTitle'),
      ModalButtonClose:lang.getPhrase('ModalButtonClose'),
      CartTotal:lang.getPhrase('CartTotal'),
  };

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));



  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} langSettings={langSettings}/>;
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={langSettings.CartTitle} onClose={callbacks.closeModal} langSettings={langSettings}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} langSettings={langSettings}/>
    </ModalLayout>
  );
}

export default memo(Basket);
