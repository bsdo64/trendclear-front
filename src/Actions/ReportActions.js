import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class ReportActions {
  constructor() {
    this.generateActions('sendReport');
  }
  openReportModal(payload = {}) {
    payload.openReportModal = true;
    return payload;
  }
  closeReportModal() {
    return {open: false};
  }
  toggleReportModal(props) {
    return props;
  }
  
  submitReport() {
    
  }
  
  submitSearchQuery(params) {
    return (dispatch) => {
      Api
        .setType('/ajax')
        .get('/search', params)
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
