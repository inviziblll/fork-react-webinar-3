import StoreModule from '../module';
import dictionary from './dictionary';

class Lang extends StoreModule {

  initState() {
    return {
      curLang: 'ru',
    };
  }

  setLang(lang){
    this.setState(
      {
        ...this.getState(),
        curLang: lang
      },
      'Устанавливаем текущий язык'
    )
  }

  getPhrase(str){
    
    if(this.getState().curLang === 'ru'){
      return dictionary['ru'][str];
    } 

    if(this.getState().curLang === 'en'){
       return dictionary['en'][str];
    } 

  }

}

export default Lang;