import StoreModule from '../module';
class UserState extends StoreModule {

  initState() {

    return {
        waiting: false,
        error: '',
        name:false,
        email:false,
        phone:false,
        auth:false
    };
  }

  async profile(t) {

    this.setState({
      name:false,
      email:false,
      phone:false,
    });
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/users/self?fields=*', {
          headers: { 'X-Token': token }
      });
      const data = await response.json();
      this.setState(
        {
          name: data.result.profile.name,
          email: data.result.email,
          phone: data.result.profile.phone,
          waiting: false,
        }, 
        t('profile.heading'),
      );
    } 
    catch (e) {
      this.setState({
        name:false,
        email:false,
        phone:false,
      }, 
      e.message);
    }
  }

  async logout(t) {

    try {
      const token = localStorage.getItem('token');
      await fetch('/api/v1/users/sign', {
          method: 'DELETE',
          headers: { 'X-Token': token }
      });

      this.setState({
        name:false,
        email:false,
        phone:false,
        auth:false
      },
      t('user.loggedout'));

      localStorage.removeItem('token');     
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


  async sign(login, password, t, handleLogin) { 
    
    this.setState({
      auth: false,
      waiting: true,
      error: '',
    });

    try {

        const response = await fetch('/api/v1/users/sign', {
            method: 'POST',
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password })
        });

        if (response.status == 404) {
          throw new Error(t('incorrect.request')); 
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(this.responseError(data.error)); // ловим ошибку и обрабатываем ее в отдельном методе
        }
       
        localStorage.setItem('token', data.result.token);
        this.setState(
          {
            auth: true,
            waiting: false,
            error: ''
          }, t('user.logged'), 
        );
        
        handleLogin(true, false); 
    } 
    catch (error) {
      this.setState({
        auth: false,
        waiting: false,
        error: error.message
      }, error.message);

      handleLogin(false, error.message); 
    }
  }


}

export default UserState;
