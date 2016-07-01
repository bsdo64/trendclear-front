import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import SubCommentActions from '../../Actions/SubCommentActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class SubComments {
  constructor() {
    this.displayName = 'SubComments';

    this.bindActions(AppActions);
    this.bindActions(SubCommentActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {

  }

  onAddList(subComments) {
    this.setMergeState(subComments);
  }
}

export default alt.createStore(immutable(SubComments), SubComments.name);
