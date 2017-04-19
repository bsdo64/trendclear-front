import React from 'react';
import PropTypes from 'prop-types';
import AvatarImage from '../../../../components/AvatarImage';

require('./index.scss');

const ImageBox = (props) => {
  const { profile, srcUrl } = props;
  const sex = profile.get('sex'),
    avatar_img = profile.get('avatar_img');

  if (srcUrl) {
    return <img src={srcUrl}/>;
  } else {
    return <AvatarImage
      imageClass="image_preview"
      sex={sex}
      avatarImg={avatar_img}
      removable={true}
    />;
  }
};

ImageBox.propTypes = {
  profile: PropTypes.object,
  srcUrl: PropTypes.string,
};

class AvatarImageModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      imagePreviewUrl: null,
    };

    this.handleFile = this.handleFile.bind(this);
    this.uploadAvatarImage = this.uploadAvatarImage.bind(this);
  }

  handleFile(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {

      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  uploadAvatarImage() {
    if (this.state.file) {
      this.props.FireRequestUserAvatarImageUpload(this.state.file);
    }
  }
  render() {
    const { UserStore } = this.props;
    const user = UserStore.get('user');
    const profile = UserStore.get('profile');

    return (
      <div className="avatar_img">
        <div className="ui items ">
          <div className="header">
            <div className="header_title">프로필 이미지 변경</div>
          </div>
          <div className="item">
            <div className="image">
              <ImageBox
                srcUrl={this.state.imagePreviewUrl}
                profile={profile}
              />
              {/*<input name="thumb-roundness" className="slider form-control ng-valid ng-scope ng-dirty" type="range" />*/}
            </div>
            <div className="content">
              <a className="header">{user.get('nick')}</a>
              <div className="meta">
                <span className="cinema">이미지를 변경합니다</span>
              </div>
              <div className="extra">
                <input type="file" onChange={this.handleFile}/>
                <div className="ui label button"
                     onClick={this.uploadAvatarImage}>이미지 업로드
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AvatarImage.displayName = 'AvatarImageModal';
AvatarImage.propTypes = {
  UserStore: PropTypes.object.isRequired,
  FireRequestUserAvatarImageUpload: PropTypes.func.isRequired,
};

export default AvatarImageModal;
