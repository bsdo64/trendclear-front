import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import PostActions from '../Actions/PostActions';
import { initListener, setMergeState } from './Helper/func';

class BestPostStore{
  constructor() {
    this.displayName = 'BestPostStore';

    this.bindActions(AppActions);
    this.bindActions(PostActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }

  onGetBestPost(response) {
    const normalizedPosts = response.results;
    const total = response.total;

    const oldResult = this.state.getIn(['posts', 'postList', 'result']);
    const newResult = oldResult.concat(normalizedPosts.result);

    console.log(newResult.toJS());

    const mergePosts = this.state.mergeDeep({posts: {postList: {entities: normalizedPosts.entities}}});
    const mergeResults = mergePosts.setIn(['posts', 'postList', 'result'], newResult);
    const mergeTotal = mergeResults.mergeDeep({posts: {collection: {total: total}}});

    this.setState(mergeTotal);
  }
}

export default alt.createStore(immutable(BestPostStore));
