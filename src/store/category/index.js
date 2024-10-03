// import { createFlatCategories } from '../../utils'; // !!!
import StoreModule from '../module';

/**
 * Категории
 */

class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      waiting: false,
      error: null,
    };
  }

  async catagoryList() { 
    
    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'Установлены параметры категорий',
    );

    // Сохраняем список полученных категорий
    const res = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const list = await res.json();
    this.setState(
        {
          ...this.getState(),
          list: this.formatList(list.result.items), 
          waiting: false,
        },
        'Загружен списока категорий из АПИ',
    );
  }
  
  formatList(items) { // Форматируем список категорий по иерархии разделов
      const formatList = [];
      let parentId = false;
      let level = 0;
      const recursion = (parentId , level) => {
            items
            .filter(item => (item.parent ? item.parent._id : false) === parentId)
            .forEach(item => {
                let str = '-'.repeat(level) + item.title;
                formatList.push({ ...item, value:item._id, title: str });
                recursion(item._id, level + 1);
            });
      };
      recursion(parentId, level);
      return formatList;
  }

}

export default CategoryState;
