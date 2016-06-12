import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {normalize, arrayOf} from 'normalizr';
import {post, comment, subComment} from './normalizr/schema';

class GnbActions {
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
        .setType('/ajax')
        .get('/best', categoryValue)
        .then((res) => {

          let response = {
            origin: res.results,
            results: normalize(res.results, arrayOf(post)),
            total: res.total
          };

          dispatch(response);
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

module.exports = alt.createActions(GnbActions);
