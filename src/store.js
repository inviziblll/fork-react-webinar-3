/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.unic = this.state.list[this.state.list.length - 1].code; // код последнего элемента
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
    
    // let element = this.state.list[this.state.list.length - 1]; // последний элемент 
    // let unic = element.code + 1; // уникальный код всегда больше на 1 кода последнего элемента списка

    this.unic = this.unic + 1; // уникальный код всегда больше на 1 кода последнего элемента списка

    this.setState({
        ...this.state,
        list: [...this.state.list, { 
          // code: Date.now().toString(36), // генерация уникального кода с преобразованием в строку временной метки
          code: this.unic, 
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
