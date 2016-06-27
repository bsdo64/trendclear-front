import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import SearchActions from '../Actions/SearchActions';
import { initListener, setMergeState } from './Helper/func';

class SearchStore{
  constructor() {
    this.displayName = 'SearchStore';

    this.bindActions(AppActions);
    this.bindActions(SearchActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }
  onHandleSearchQuery(query) {
    this.setMergeState({
      query: query
    })
  }
  onSubmitSearchQuery(query) {
    this.setState(Map({
      query: query
    }))
  }
}

export default alt.createStore(immutable(SearchStore), SearchStore.name);
