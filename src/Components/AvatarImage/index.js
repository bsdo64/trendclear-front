import React from 'react';
import ImageType from '../Lib/ImageType';
import UserActions from '../../Actions/UserActions';

const removeImage = () => UserActions.removeAvatarImage();

const AvatarImage = (props) => {
  const { avatarImg, sex, imageClass = '', removable, noWrap } = props;

  if (avatarImg) {
    const imageType = new ImageType('/image/uploaded/files/' + avatarImg);
    const type = imageType.getImageType();

    if (type === 'gif') {
      if (noWrap) {
        return <img className={imageClass} src={'/image/uploaded/files/' + avatarImg} />
      } else {
        return (
          <div>
            {
              removable &&
              <div className="delete_avatar_btn"
                   onClick={removeImage}
              >
                <i className="fa fa-remove" />
              </div>
            }
            <img className={imageClass} src={'/image/uploaded/files/' + avatarImg} />
          </div>
        )
      }
    } else {
      if (noWrap) {
        return <img className={imageClass} src={'/image/uploaded/files/small/' + avatarImg} />
      } else {
        return (
          <div>
            {
              removable &&
              <div className="delete_avatar_btn"
                   onClick={removeImage}
              >
                <i className="fa fa-remove" />
              </div>
            }
            <img className={imageClass} src={'/image/uploaded/files/small/' + avatarImg} />
          </div>
        )
      }
    }
  } else {
    if (sex) {
      return <img className={imageClass} src="/images/default-male.png" />;
    } else {
      return <img className={imageClass} src="/images/default-female.png" />;
    }
  }
};

export default AvatarImage;
