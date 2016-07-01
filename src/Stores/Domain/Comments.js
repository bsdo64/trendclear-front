import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import CommentActions from '../../Actions/CommentActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Comments {
  constructor() {
    this.displayName = 'Comments';

    this.bindActions(AppActions);
    this.bindActions(CommentActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {

  }

  onAddList(comments) {
    this.setMergeState(comments);
  }
}

export default alt.createStore(immutable(Comments), Comments.name);
