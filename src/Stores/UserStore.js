import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import UserActions from '../Actions/UserActions';
import { initListener, setMergeState } from './Helper/func';

class UserStore{
  constructor() {
    this.displayName = 'UserStore';

    this.bindActions(AppActions);
    this.bindActions(UserActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }
  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setState(bootstrapData[this.displayName]);
    }
  }

  onIncreaseLevel() {
    let state = this.state.updateIn(['trendbox', 'level'], val => val + 1);
    console.log(state.toJS());
    this.setMergeState(state);
  }
}

export default alt.createStore(immutable(UserStore));
