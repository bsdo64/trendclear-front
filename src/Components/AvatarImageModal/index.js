/**
 * Created by dobyeongsu on 2016. 5. 3..
 */

/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import UserActions from '../../Actions/UserActions';

require('./index.scss');
const AvatarImageModal = React.createClass({
  displayName: 'AvatarImageModal',
  modalCloseSignal() {
    "use strict";

    $(this.refs.avatar_img_modal)
      .modal({
        allowMultiple: true,
        detachable: false,
        onHidden: function() {
          UserActions.closeAvatarModal();
        }
      })
      .modal('show');
  },
  render() {
    const { UserStore } = this.props;
    
    if (UserStore.get('openAvatarModal')) {
      this.modalCloseSignal();
    }
    
    return (
      <div ref="avatar_img_modal" className="ui modal avatar_img">
        <div >hello Box</div>
      </div>
    );
  }
});

export default AvatarImageModal;
