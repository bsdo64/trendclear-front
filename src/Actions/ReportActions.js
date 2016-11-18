import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class ReportActions {
  constructor() {
    this.generateActions('toggleReportModal');
  }

  sendReport(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/user/report', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

export default alt.createActions(ReportActions);
