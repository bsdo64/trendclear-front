import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import GnbActions from '../Actions/GnbActions';
import { initListener, setMergeState } from './Helper/func';

class CommunityStore{
  constructor() {
    this.displayName = 'CommunityStore';

    this.bindActions(AppActions);
    this.bindActions(GnbActions);
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

export default alt.createStore(immutable(CommunityStore));
