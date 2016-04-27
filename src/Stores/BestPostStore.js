import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import LoginActions from '../Actions/LoginActions';
import { initListener, setMergeState } from './Helper/func';

class BestPostStore{
  constructor() {
    this.displayName = 'BestPostStore';

    this.bindActions(AppActions);
    this.bindActions(LoginActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setState(bootstrapData[this.displayName]);
    }
  }
}

export default alt.createStore(immutable(BestPostStore));
