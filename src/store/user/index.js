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

  async sign(login, password, t) {
    
    this.setState({
      auth: false,
      waiting: true,
    });

    try {
       
        const response = await fetch('/api/v1/users/sign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password })
        });

        const data = await response.json();

        if (response.ok) {     
            this.setState({
                waiting: false,
                error: '',
                auth: true
            }, 
            t('user.authorization'));
            localStorage.setItem('token', data.result.token);
        } 
        else {

            this.setState({
              auth: false,
              waiting: false,
              error: data.error.message
            }, 
            data.error.message);
        }

    } 
    catch (error) {
        
        this.setState({
          auth: false,
          waiting: false,
          error: error.message
        }, 
        t('user.error'));

    }

  }

}

export default UserState;
