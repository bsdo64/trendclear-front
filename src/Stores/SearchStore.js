import alt from '../Utils/alt';
import Immutable, { Map } from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import SearchActions from '../Actions/SearchActions';
import { initListener, setMergeState } from './Helper/func';

class SearchStore {
  static get displayName() { return 'SearchStore' }

  constructor() {

    this.bindActions(SearchActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
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

export default alt.createStore(immutable(SearchStore), SearchStore.displayName);
