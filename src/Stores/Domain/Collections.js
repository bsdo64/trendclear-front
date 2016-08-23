import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import CollectionActions from '../../Actions/CollectionActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

import Forums from '../../Stores/Domain/Forums';

class Collections {
  static displayName = 'Collections';
  constructor() {
    this.displayName = 'Collections';


    this.bindActions(CollectionActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onCreateCollection(collection) {
    collection.forums = [];
    this.setMergeState({[collection.id]: collection});
  }

  onUpdateCollection(collection) {
    this.setMergeState(collection);
  }

  onDeleteCollection(collection) {
    this.setMergeState(collection);
  }

  onAddForum(res) {
    this.waitFor(Forums);

    if (res) {
      const newState = this.state.updateIn([res.collectionId.toString(), 'forums'], forums => {
        return forums.push(res.result);
      });

      this.setMergeState(newState);
    }
  }

  onRemoveForum(res) {
    if (res.removeSuccess) {
      const newState = this.state.updateIn([res.collectionId.toString(), 'forums'], forums => {
        return forums.filter(value => value !== res.forumId)
      });

      this.setMergeState(newState);
    }
  }
}

export default alt.createStore(immutable(Collections), Collections.displayName);
