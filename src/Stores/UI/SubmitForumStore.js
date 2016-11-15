import alt from '../../Utils/alt';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import ForumActions from '../../Actions/ForumActions';
import { initListener, setMergeState } from '../Helper/func';

const defaultProps = {

  form: {
    inputValue: {
      title: null,
      subHeader: null,
      description: null,
      rule: null,
    },
    didValidate: {
      title: false,
    },
    validate: {
      title: null
    },
    error: null
  },
};

class SubmitForumStore {
  static get displayName() { return 'SubmitForumStore' }

  constructor() {

    this.bindActions(ForumActions);
    this.state = Immutable.fromJS(defaultProps);

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onValidateBeforeCreateForum(result) {
    if (result.success) {
      const newState = this.state
        .updateIn(['form', 'didValidate'], item => {
          return item.set('title', true);
        })
        .updateIn(['form', 'validate'], item => {
          return item.set('title', true);
        })
        .setIn(['form', 'error'], null);

      this.setState(newState);
    } else if (!result.success && result.type === 'Error') {
      const newState = this.state
        .updateIn(['form', 'didValidate'], item => {
          return item.set('title', true);
        })
        .updateIn(['form', 'validate'], item => {
          return item.set('title', false);
        })
        .setIn(['form', 'error'], result);

      this.setState(newState);
    }
  }
}

export default alt.createStore(immutable(SubmitForumStore), SubmitForumStore.displayName);
