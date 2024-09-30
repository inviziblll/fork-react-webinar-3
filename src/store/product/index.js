import StoreModule from '../module';

class ProductCatalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      item: false,  
    };
  }

  async load(id) {
      const response = await fetch(`/api/v1/articles/${id}?fields=description,title,edition,_id,price,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({...this.getState(), item: json.result}, 'Товар загружен из АПИ');
      return json.result;
  }
}

export default ProductCatalog;
