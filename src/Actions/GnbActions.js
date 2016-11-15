import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import { normalize, arrayOf } from 'normalizr';
import { post } from '../Model/normalizr/schema';

class GnbActions {
  constructor() {
    this.generateActions('addForum', 'toggleGnb');
  }

  openSideCategory(clubId) {
    return clubId;
  }

  openForumMeta(forumId) {
    return forumId;
  }

  updateFilter(val) {
    return val
  }

  getForums(categoryId) {
    return categoryId;
  }

  saveFilter(categoryValue) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .get('/best', categoryValue)
        .then((res) => {

          res.data = normalize(res.data, arrayOf(post));
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  /**
   * @name GnbActions.resetFilter
   * @returns {boolean}
   */
  resetFilter() {
    return true;
  }
}

export default alt.createActions(GnbActions);
