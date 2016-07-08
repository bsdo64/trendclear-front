import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import NotiActions from '../../Actions/NotiActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Notis {
  static displayName = 'Notis';
  constructor() {
    this.displayName = 'Notis';

    this.bindActions(AppActions);
    this.bindActions(NotiActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {

  }

  onAddList(notis) {
    this.setMergeState(notis);
  }
}

export default alt.createStore(immutable(Notis), Notis.displayName);
