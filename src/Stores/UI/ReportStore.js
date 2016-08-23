import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import ReportActions from '../../Actions/ReportActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class ReportStore{
  static displayName = 'ReportStore';
  constructor() {
    this.displayName = 'ReportStore';

    this.bindActions(ReportActions);
    this.state = Immutable.Map({
      reportItem: [
        {
          id: 1,
          message: '불쾌하거나 흥미없는 내용입니다.'
        },
        {
          id: 2,
          message: '스팸성 글입니다.'
        },
        {
          id: 3,
          message: '인신공격, 불법, 허위 내용을 유포하고 있습니다.'
        }
      ],
      selectItem: 1,
      openReportModal: false,
      successReport: false
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onOpenReportModal(payload) {
    this.setMergeState(Map(payload))
  }
  onCloseReportModal() {
    this.setMergeState(Map({openReportModal: false, selectItem: 1, successReport: false}))
  }
  
  onSendReport() {
    
    
    this.setMergeState(Map({successReport: true}))
  }
}

export default alt.createStore(immutable(ReportStore), ReportStore.displayName);
