import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import ListActions from '../../Actions/ListActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

import {normalize, arrayOf} from 'normalizr';
import {club, post, prefix, comment, noti} from '../../Model/normalizr/schema';

class ListStore {
  constructor() {
    this.displayName = 'ListStore';

    this.bindActions(AppActions);
    this.bindActions(ListActions);
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

  onAdd(list) {
    this.setMergeState(list);
  }
}

export default alt.createStore(immutable(ListStore), ListStore.name);
