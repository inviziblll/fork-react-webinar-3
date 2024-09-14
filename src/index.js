import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: 7, title: 'Название элемента', quantity: 0 },
    { code: 6, title: 'Некий объект', quantity: 0 },
    { code: 3, title: 'Заголовок', quantity: 0 },
    { code: 1, title: 'Очень длинное название элемента из семи слов', quantity: 0 },
    { code: 5, title: 'Запись', quantity: 0 },
    { code: 2, title: 'Шестая запись', quantity: 0 },
    { code: 4, title: 'Седьмая запись', quantity: 0 },
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
