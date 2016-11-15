import alt from '../Utils/alt';

class ListActions {
  constructor() {
    this.generateActions('add', 'setScroll')
  }
}

export default alt.createActions(ListActions);
