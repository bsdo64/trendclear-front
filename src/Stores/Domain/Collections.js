import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import CollectionActions from '../../Actions/CollectionActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Collections {
  static displayName = 'Collections';
  constructor() {
    this.displayName = 'Collections';

    this.bindActions(AppActions);
    this.bindActions(CollectionActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onCreateCollection(collection) {
    this.setMergeState(collection);
  }

  onUpdateCollection(collection) {
    this.setMergeState(collection);
  }

  onDeleteCollection(collection) {
    this.setMergeState(collection);
  }
}

export default alt.createStore(immutable(Collections), Collections.displayName);
