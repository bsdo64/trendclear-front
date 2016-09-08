import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import DeleteActions from '../../Actions/DeleteActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class RemoveModalStore{
  static displayName = 'RemoveModalStore';
  constructor() {
    this.displayName = 'RemoveModalStore';

    this.bindActions(DeleteActions);
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
      openModal: false,
      success: false
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onOpenModal(payload) {
    this.setMergeState(Map(payload))
  }
  onCloseModal() {
    this.setMergeState(Map({openModal: false, selectItem: 1, success: false}))
  }

  onDelete(deletedItem) {
    if (deletedItem.id) {
      this.setMergeState(Map({openModal: false}))
    }
  }
}

export default alt.createStore(immutable(RemoveModalStore), RemoveModalStore.displayName);
