import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import GnbActions from '../../Actions/GnbActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Categorygroups {
  static displayName = 'CategoryGroups';
  constructor() {
    this.displayName = 'Categorygroups';

    this.bindActions(GnbActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onAddCategoryGroup(categoryGroups) {
    this.setMergeState(categoryGroups);
  }
}

export default alt.createStore(immutable(Categorygroups), Categorygroups.displayName);
