/**
 * Created by dobyeongsu on 2016. 5. 3..
 */

/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import UserActions from '../../Actions/UserActions';
import Modal from 'react-modal';

require('./index.scss');
const AvatarImageModal = React.createClass({
  displayName: 'AvatarImageModal',
  getInitialState() {
    return {
      file: null,
      imagePreviewUrl: null
    };
  },

  modalClose() {
    UserActions.closeAvatarModal();
  },
  modalCloseSignal() {
    "use strict";

    UserActions.closeAvatarModal();
  },
  handleFile: function(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {

      console.log(file);
      console.log(reader);
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  },
  uploadAvatarImage() {
    "use strict";
    
    UserActions.uploadAvatarImage(this.state.file);
  },
  render() {
    const { UserStore, AvatarStore } = this.props;
    const user = UserStore.get('user');
    const profile = UserStore.get('profile');
    const icon = UserStore.get('icon');
    const grade = UserStore.get('grade');
    const trendbox = UserStore.get('trendbox');

    const openAvatarModal = UserStore.get('openAvatarModal');

    const sex = profile.get('sex'),
          avatar_img = profile.get('avatar_img');
    let avatarImg;

    if (this.state.imagePreviewUrl) {
      avatarImg = <img src={this.state.imagePreviewUrl} />;
    } else if (avatar_img) {
      avatarImg = <img src={'/image/uploaded/files/' + avatar_img} />;
    } else {
      if (sex) {
        avatarImg = <img src="/images/default-male.png" />;
      } else {
        avatarImg = <img src="/images/default-female.png" />;
      }
    }
    
    return (
      <Modal
        overlayClassName={'ui dimmer modals page transition visible active ' + (openAvatarModal ? '' : 'fade out')}
        className="ui modal avatar_img scrolling transition visible active "
        isOpen={openAvatarModal}
        closeTimeoutMS={500}
        onRequestClose={this.modalClose}
      >

        <div className="ui items">
          <div className="header">
            <div className="header_title">프로필 이미지 변경</div>
          </div>
          <div className="item">
            <div className="image">
              { avatarImg }
            </div>
            <div className="content">
              <a className="header">{user.get('nick')}</a>
              <div className="meta">
                <span className="cinema">이미지를 변경합니다</span>
              </div>
              <div className="extra">
                <input type="file" onChange={this.handleFile} />
                <div className="ui label button" onClick={this.uploadAvatarImage}>이미지 업로드</div>
              </div>
            </div>
          </div>
        </div>
        </Modal>
    );
  }
});

export default AvatarImageModal;
