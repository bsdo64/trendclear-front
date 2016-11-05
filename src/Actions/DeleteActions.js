import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class DeleteActions {
  constructor() {
    this.generateActions('toggleModal');
  }

  delete(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .delete('/user/removeItem', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

export default alt.createActions(DeleteActions);
