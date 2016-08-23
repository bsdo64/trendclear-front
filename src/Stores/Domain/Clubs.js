import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import GnbActions from '../../Actions/GnbActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Clubs {
  static displayName = 'Clubs';
  constructor() {
    this.displayName = 'Clubs';

    this.bindActions(GnbActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onAddClub(clubs) {
    this.setMergeState(clubs);
  }
}

export default alt.createStore(immutable(Clubs), Clubs.displayName);
