import * as translations from './translations';

 class I18nService {  
  
  /**
   * @param services {Services}
   * @param lang {String}
   * @param listeners {Object}
   */
  constructor(services) {
    this.services = services;
    this.config = {};
    this.lang = this.initState()['lang'];
    this.listeners = [];  
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
   * Начальное состояние 
   * @return {Object}
   */
  initState() {
      return {
        lang: 'ru',
      }
  }

  /**
   * Установка языка
   * @param newState {Object}
   */
  setLang = (lang) => { 
    
    this.listeners.forEach((subscriber) => {
      subscriber(lang)
    });
    this.lang = lang;
    this.services.api.setHeader('X-lang', lang); //  устанавливаем заголовок в сервисе API при смене кода языка
  };

  /**
 * Перевод фразу по словарю
 * @param lang {String} Код языка
 * @param text {String} Текст для перевода
 * @param [plural] {Number} Число для плюрализации
 * @returns {String} Переведенный текст
 */
  translate = (text, plural) => {
    let result = (translations[this.lang] && text in translations[this.lang])
        ? translations[this.lang][text]
        : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  };

}

export default I18nService;
