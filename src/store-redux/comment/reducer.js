// Начальное состояние
export const initialState = {
  items: [],
  waiting: false, // признак ожидания загрузки 
  count: 0,
};

function reducer(state = initialState, action) {
  
  switch (action.type) {
    
    case 'comments/load-start':{
          return { ...state, items: [], waiting: true };
    }

    case 'comments/load-success':{
          const { items, count } = action.payload;

          // console.log('comments/load-success');
          // console.log(items);
          return { ...state, items, count, waiting: false }; 
    }

    case 'comments/load-error':{
          return { ...state, items: [], waiting: false }; //@todo текст ошибки сохранять?
    }

    case 'comments/add-success':{ 
          const items = [...state.items, action.payload];
          return { ...state, items, count:state.count + 1, waiting: false, error: '' };
    }
    
    default:
      // Нет изменений
      return state; 
  }
}

export default reducer;
