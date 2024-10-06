import StoreModule from '../module';
class ProfileState extends StoreModule {

  initState() {

    return {
        error: '',
        name:false,
        email:false,
        phone:false,
    };
  }

  async fields(t) {
    
    this.setState({
        name:false,
        email:false,
        phone:false,
        error: '',
    });
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/users/self?fields=*', {
          headers: { 'X-Token': token }
      });
      if (response.status == 404) {
          throw new Error(t('incorrect.request')); 
      }
      const data = await response.json();

      if (!response.ok) {
          throw new Error(this.responseError(data.error)); // ловим ошибку и обрабатываем ее в отдельном методе
      }

      this.setState(
        {
          name: data.result.profile.name,
          email: data.result.email,
          phone: data.result.profile.phone,
        }, 
        t('profile.heading'),
      );

    } 
    catch (error) {
      this.setState({
        name:false,
        email:false,
        phone:false,
        error: error.message,

      }, 
      error.message);
    }
  }

  async logout(t, logout) {
    try {
     
      this.setState({
        error:'',
        name:false,
        email:false,
        phone:false,
      },
      t('user.loggedout'));

    } 
    catch (e) {
      console.error(t('user.logouterror'), e)
    }
  }

  responseError(error) { 
    let result = error.data.issues;
    result = result.map((item) => {
        return item.message
    });

    result = result.join(', ');
    return result;
  }


}

export default ProfileState;
