import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class CollectionActions {
  constructor() {
    this.generateActions('addPrefixes');
  }
  createCollection(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/collection', params)
        .then((res) => {
          if (res === 'ok') {
            dispatch(params);
          } else {
            dispatch(false);
          }
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

module.exports = alt.createActions(CollectionActions);
