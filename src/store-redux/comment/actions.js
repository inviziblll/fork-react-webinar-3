export default {
  
  load: id => {
    
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        const { count, items } = res.data.result;

        dispatch({ type: 'comments/load-success', payload: { items, count } });
      } 
      catch (e) {
        dispatch({ type: 'comments/load-error' }); 
      }
    };

  }, 


  addComment: (commentParams) => {

    return async (dispatch, getState, services) => {
     
      try {

        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify(commentParams),
        }); 
        const payload = {...res.data.result, author: { 
          profile: { name: commentParams.user.profile.name },
          _id:commentParams.user._id
        }};
        dispatch({ type: 'comments/create-success', payload: payload});

      } 
      catch (e) {
        dispatch({ type: 'comments/create-error' });
      }

    };
  },

};
