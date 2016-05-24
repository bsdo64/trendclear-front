import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class SearchActions {
  handleSearchQuery(query) {
    return query;
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

export default alt.createActions(SearchActions);
