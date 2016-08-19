import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {normalize, arrayOf} from 'normalizr';
import {forum} from '../Model/normalizr/schema';

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
          if (res) {
            dispatch(res);
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
          if (res) {
            res = normalize(res, forum);
            res.collectionId = params.collectionId;

            dispatch(res);
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
          if (res) {
            const result = {
              removeSuccess: res,
              forumId: params.forumId,
              collectionId: params.collectionId
            };

            dispatch(result);
          } else {
            dispatch(false);
          }
        })
        .catch((err) => {
          return err;
        });
    };
  }

  findForumByTitle(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .get(`/forum`, params)
        .then((res) => {
          if (res) {
            res = normalize(res, arrayOf(forum)),
            dispatch(res);
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

export default alt.createActions(CollectionActions);
