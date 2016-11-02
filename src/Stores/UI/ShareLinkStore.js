import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import VenaStoreActions from '../../Actions/VenaStoreActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';
import moment from 'moment';

const defaultProps = {
  openVenalink: false,
  venalinkRP: '',
  startDate: moment()
};

class ShareLinkStore {
  static displayName = 'ShareLinkStore';

  constructor() {

    this.bindActions(VenaStoreActions);
    this.state = Immutable.fromJS(defaultProps);

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }
}

export default alt.createStore(immutable(ShareLinkStore), ShareLinkStore.displayName);
