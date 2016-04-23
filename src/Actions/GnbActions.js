import alt from '../Utils/alt';

class GnbActions {
  toggleGnb(openned) {
    return openned;
  }
  openSideCategory(clubId) {
    return clubId;
  }
}

module.exports = alt.createActions(GnbActions);
