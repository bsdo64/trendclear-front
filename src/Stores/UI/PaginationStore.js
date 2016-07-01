import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import PaginationActions from '../../Actions/PaginationActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

import {normalize, arrayOf} from 'normalizr';
import {club, post, prefix, comment, noti} from '../../Model/normalizr/schema';

class PaginationStore {
  constructor() {
    this.displayName = 'PaginationStore';

    this.bindActions(AppActions);
    this.bindActions(PaginationActions);
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

  onAddPagination(collection) {
    this.setMergeState(collection);
  }
}

export default alt.createStore(immutable(PaginationStore), PaginationStore.name);
