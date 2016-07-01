import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import PostActions from '../../Actions/PostActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Posts {
  constructor() {
    this.displayName = 'Posts';

    this.bindActions(AppActions);
    this.bindActions(PostActions);
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
  
  onAddList(posts) {
    this.setMergeState(posts);
  }
}

export default alt.createStore(immutable(Posts), Posts.name);
