import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      activePage: 1,
    };
  }

  async load(limit) {
    
    const offset = (this.getState().activePage - 1) * limit;
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${offset}&fields=items(_id, title, price),count`);

    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        pages: Math.ceil(json.result.count / limit)
      },
      'Загружены товары из АПИ',
    );
  }
 

  setActivePage(page) {
    this.setState({
      ...this.getState(),
      activePage:page
    })
  }

}

export default Catalog;
