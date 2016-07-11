import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import PostActions from '../Actions/PostActions';
import CommunityActions from '../Actions/CommunityActions';
import GnbActions from '../Actions/GnbActions';
import { initListener, setMergeState } from './Helper/func';

import CommunityStore from './CommunityStore';
import GnbStore from './GnbStore';

class BestPostStore{
  static displayName = 'BestPostStore';
  
  constructor() {
    this.displayName = 'BestPostStore';

    this.bindActions(AppActions);
    this.bindActions(PostActions);
    this.bindActions(CommunityActions);
    this.bindActions(GnbActions);

    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    const StoreData = bootstrapData[this.displayName];
    if (StoreData && !(this.state.equals(Immutable.fromJS(StoreData))) ) {
      this.setMergeState(StoreData);
    }

  }

  onGetBestPost(response) {
    const normalizedPosts = response.data;
    const total = response.collection.total;

    const oldResult = this.state.getIn(['posts', 'postList', 'result']);
    const newResult = oldResult.concat(normalizedPosts.result);

    const mergePosts = this.state.mergeDeep({posts: {postList: {entities: normalizedPosts.entities}}});
    const mergeResults = mergePosts.setIn(['posts', 'postList', 'result'], newResult);
    const mergeTotal = mergeResults.mergeDeep({posts: {collection: {total: total}}});

    const updateCollection = mergeTotal.updateIn(['posts', 'collection'], col => {

      const checkMorePage = (col.get('limit') * (col.get('current_page') + 1) < total);

      return col.merge({
        current_page: col.get('current_page') + 1,
        next_page: checkMorePage ? col.get('next_page') + 1 : null,
        noMore: !checkMorePage
      })
    });
    this.setState(updateCollection);
  }

  onResetBestPage() {
    const updateCollection = this.state.updateIn(['posts', 'collection'], col =>
      col.merge({
        current_page: 1,
        next_page: 2
      })
    );

    const updateNoMore = updateCollection.set('noMore', false);
    this.setState(updateNoMore);
  }
  

  onSubmitComment() {
    this.waitFor(CommunityStore);

    let state = this.state.toJS();
    state.skills.map((value, key) => {
      if (value.skill.name === 'write_comment') {
        value.using_at = new Date();
      }
    });

    state.trendbox.exp = state.trendbox.exp + 5;
    state.trendbox.T = state.trendbox.T + 10;

    this.setMergeState(state);
  }

  onSaveFilter(response) {
    this.waitFor(GnbStore);

    if (response) {
      const normalizedPosts = response.results;
      const total = response.total;
      const limit = 10;

      const mergeData = this.state.setIn(['posts', 'data'], response.origin);
      const mergeResults = mergeData.setIn(['posts', 'postList'], normalizedPosts);
      const mergeTotal = mergeResults.mergeDeep({
        posts: {
          collection: {
            total: total,
            current_page: 1,
            next_page: (limit > total) ? null : 2,
            limit: limit
          }
        }
      });


      if (normalizedPosts.result.length < 10) {
        const noMorePost = mergeTotal.set('noMore', true);

        this.setMergeState(noMorePost.toJS());
      } else {
        const morePost = mergeTotal.set('noMore', false);
        this.setMergeState(morePost.toJS());
      }
    }
  }
}

export default alt.createStore(immutable(BestPostStore), BestPostStore.displayName);
