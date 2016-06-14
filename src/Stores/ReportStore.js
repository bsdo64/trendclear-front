import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import ReportActions from '../Actions/ReportActions';
import { initListener, setMergeState, locationHref } from './Helper/func';

class ReportStore{
  constructor() {
    this.displayName = 'ReportStore';

    this.bindActions(AppActions);
    this.bindActions(ReportActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }
  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }
  onOpenReportModal(payload) {
    this.setMergeState(Map(payload))
  }
  onCloseReportModal(prop) {
    this.setMergeState(Map({openReportModal: prop.open}))
  }
}

export default alt.createStore(immutable(ReportStore));
