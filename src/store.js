/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.unique = this.maxCode(); // код элемента с максимальным значением
  }

  maxCode(){
      let listCodes = this.state.list.map(item => { // получаем списолк всех кодов у элементов
        return item.code;
      });
      let maxCode = Math.max(0, ...listCodes); // код с максимальным значением
      return maxCode;
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

  /**
   * Добавление новой записи
   */
  addItem() {
    this.unique = this.unique + 1; //  уникальный код больше на 1 кода элемента с максимальным значением
    this.setState({
        ...this.state,
        list: [...this.state.list, { 
          // code: unique, 
          code: this.unique, 
          title: 'Новая запись',
          quantity: 0 
        }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {

    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
            item.selected = !item.selected;

            // счетчик количества выделений
            if(item.selected == true) { 
              item.quantity++; 
            }
        }
        else{ // сбрасываем выделение у элемента который мог быть выделен раньше
          item.selected = false; 
        }
        return item;
      }),
    });
  }
}

export default Store;
