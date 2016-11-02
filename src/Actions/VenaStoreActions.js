import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {normalize, arrayOf} from 'normalizr';
import {forum} from '../Model/normalizr/schema';

class VenaStoreActions {
  constructor() {
    this.generateActions('toggleVenacleStore', 'tooltipInit', 'togglePurchaseWindow');
  }

  initItems(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .get('/venastore', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  requestPurchaseItem(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/venastore/purchase/item', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    }
  }

  requestActivateVenalink(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/venalink/activate', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    }
  }

  requestParticipateVenalink(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/venalink/participate', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    }
  }
}

export default alt.createActions(VenaStoreActions);
