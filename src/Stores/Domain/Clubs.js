import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import GnbActions from '../../Actions/GnbActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Clubs {
  constructor() {
    this.displayName = 'Clubs';

    this.bindActions(AppActions);
    this.bindActions(GnbActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {

  }

  onAddClub(clubs) {
    this.setMergeState(clubs);
  }
}

export default alt.createStore(immutable(Clubs), Clubs.name);
