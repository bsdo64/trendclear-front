import alt from '../../Utils/alt';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import VenaStoreActions from '../../Actions/VenaStoreActions';
import PostActions from '../../Actions/PostActions';
import { initListener, setMergeState } from '../Helper/func';
import moment from 'moment';

const defaultProps = {
  openVenalink: false,
  venalinkRP: '',
  startDate: moment()
};

class ShareLinkStore {
  static get displayName() { return 'ShareLinkStore' }

  constructor() {
    this.displayName = 'ShareLinkStore';
    this.bindActions(VenaStoreActions);
    this.bindActions(PostActions);
    this.state = Immutable.fromJS(defaultProps);

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onToggleActivateVenalinkModal(data) {
    if (data.venalinkActivateRequestPostId) {
      this.setMergeState({ venalinkActivateRequestPostId: data.venalinkActivateRequestPostId });
    } else {
      this.setMergeState({ venalinkActivateRequestPostId: null });
    }
  }
}

export default alt.createStore(immutable(ShareLinkStore), ShareLinkStore.displayName);