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
}

module.exports = alt.createActions(GnbActions);
