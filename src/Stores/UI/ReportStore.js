import alt from '../../Utils/alt';
import Immutable, { Map } from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import { initListener, setMergeState } from '../Helper/func';
import ReportActions from '../../Actions/ReportActions';
import ModalActions from '../../Actions/ModalActions';

class ReportStore {
  static get displayName() { return 'ReportStore' }

  constructor() {
    this.displayName = 'ReportStore';

    this.bindActions(ReportActions);
    this.bindListeners({
      onCloseModal: [ModalActions.closeModal]
    });
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

  onCloseModal() {
    this.setMergeState(Map({ openReportModal: false, selectItem: 1, successReport: false }))
  }

  onToggleReportModal(result) {
    this.setMergeState(Map(result.data))
  }

  onSendReport() {

    this.setMergeState(Map({ successReport: true }))
  }
}

export default alt.createStore(immutable(ReportStore), ReportStore.displayName);
