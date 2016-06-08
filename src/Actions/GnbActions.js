import alt from '../Utils/alt';

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
}

module.exports = alt.createActions(GnbActions);
