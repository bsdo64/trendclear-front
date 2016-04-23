import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import LoginActions from '../Actions/LoginActions';
import { initListener, setMergeState } from './Helper/func';

class BestPostStore{
  constructor() {
    this.displayName = 'BestPostStore';

    this.bindActions(LoginActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

}

export default alt.createStore(immutable(BestPostStore));
