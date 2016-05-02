import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import UserActions from '../Actions/UserActions';
import { initListener, setMergeState, locationHref } from './Helper/func';

class SubmitStore{
  constructor() {
    this.displayName = 'SubmitStore';

    this.bindActions(AppActions);
    this.bindActions(UserActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }
  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }
  
}

export default alt.createStore(immutable(SubmitStore));
