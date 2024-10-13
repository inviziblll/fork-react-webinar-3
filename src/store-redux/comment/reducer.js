// Начальное состояние
export const initialState = {
  items: [],
  waiting: false, // признак ожидания загрузки 
  count: 0,
  error: false
};

function reducer(state = initialState, action) {
  
  switch (action.type) {
    
    case 'comments/load-start':{
          return { ...state, items: [], waiting: true };
    }

    case 'comments/load-success':{
          const { items, count } = action.payload;
          return { ...state, items, count, waiting: false }; 
    }

    case 'comments/load-error':{
          return { ...state, items: [], waiting: false }; //@todo текст ошибки сохранять?
    }

    case 'comments/create-success': {
        const count = state.count + 1;
        const items = [...state.items, {...action.payload}]; 
        return { ...state, items, count, waiting: false, error: false };
    }

    case 'comments/create-error':{
        return { ...state, waiting: false, error: 'Ошибка при создании комментария' };
    }
    
    default:
      // Нет изменений
      return state; 
  }
}

export default reducer;
