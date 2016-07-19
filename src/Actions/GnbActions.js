import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {normalize, arrayOf} from 'normalizr';
import {post, comment, subComment} from '../Model/normalizr/schema';

class GnbActions {
  constructor() {
    this.generateActions('addClub', 'addCategory', 'addCategoryGroup', 'addForum');
  }
  toggleGnb(openned) {
    return openned;
  }
  openSideCategory(clubId) {
    return clubId;
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

          res.data = normalize(res.data, arrayOf(post)),
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
  resetFilter() {
    return true;
  }
}

module.exports = alt.createActions(GnbActions);
