import alt from '../Utils/alt';

class AppActions {
  init(bootstrapData) {
    return bootstrapData;
  }
  openSideCategory(clubId) {
    return clubId;
  }
}

module.exports = alt.createActions(AppActions);
