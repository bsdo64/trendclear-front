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
  updateCollection(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .put('/collection', params)
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
  deleteCollection(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .del('/collection', params)
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

  addForum(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post(`/collection/${params.collectionId}/forum`, {forumId: params.forumId})
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
  removeForum(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .delete(`/collection/${params.collectionId}/forum/${params.forumId}`)
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
