import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  // cart
  removeProduct(code) {
      this.setState({
        ...this.state,
        cart: this.state.cart.filter(item => item.code !== code),
      });
      this.countCartPriceByProducts(this.state.cart);
  }
  
  addProduct(code) {
      let product = this.state.list.find(item => item.code === code);
      let cartProduct = this.state.cart.find(item => item.code === code); 

      if (cartProduct) { // если товар уже есть в корзине увеличиваем его количество и цену
        
          let newCart = this.state.cart.map(item =>
            item.code === code
              ? { ...item, quantity: item.quantity + 1, price: item.price + product.price }
              : item
          );
          this.setState({...this.state, cart: newCart});        
      } 
      else {
        // если такого товара нет в корзине добавляем его в нее
        this.setState({...this.state, cart: [...this.state.cart, { ...product, quantity: 1}]});
      }
      this.countCartPriceByProducts(this.state.cart);
  }

  countCartPriceByProducts(cart){
      this.setState({...this.state, сartPoducts: cart.length});  
      this.setState({...this.state, сartPrice: cart.reduce((sum, item) => sum + item.price, 0)});  
  }
  
}

export default Store;
