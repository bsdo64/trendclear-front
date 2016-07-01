import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import UserActions from '../../Actions/UserActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Users {
  constructor() {
    this.displayName = 'Users';

    this.bindActions(AppActions);
    this.bindActions(UserActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }

  onAddList(users) {
    this.setMergeState(users);
  }
}

export default alt.createStore(immutable(Users), Users.name);
