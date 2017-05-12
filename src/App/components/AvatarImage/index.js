import React from 'react';
import PropTypes from 'prop-types';
import ImageType from '../../Lib/ImageType';
import AvatarImageDeleteButton from '../../containers/Frags/AvatarImageDeleteButton';

const AvatarImage = (props) => {
  const { avatarImg, sex, imageClass = '', removable, noWrap } = props;

  if (avatarImg) {
    const imageType = new ImageType('/image/uploaded/files/' + avatarImg);
    const type = imageType.getImageType();

    if (type === 'gif') {
      if (noWrap) {
        return <img className={imageClass}
                    src={'/image/uploaded/files/' + avatarImg}/>;
      } else {
        return (
          <div>
            {
              removable &&
              <AvatarImageDeleteButton />
            }
            <img className={imageClass}
                 src={'/image/uploaded/files/' + avatarImg}/>
          </div>
        );
      }
    } else {
      if (noWrap) {
        return <img className={imageClass}
                    src={'/image/uploaded/files/small/' + avatarImg}/>;
      } else {
        return (
          <div>
            {
              removable &&
              <AvatarImageDeleteButton />
            }
            <img className={imageClass}
                 src={'/image/uploaded/files/small/' + avatarImg}/>
          </div>
        );
      }
    }
  } else {
    if (sex) {
      return <img className={imageClass}
                  src={require('../../images/default-male.png')}/>;
    } else {
      return <img className={imageClass}
                  src={require('../../images/default-female.png')}/>;
    }
  }
};

AvatarImage.propTypes = {
  avatarImg: PropTypes.string,
  sex: PropTypes.bool,
  imageClass: PropTypes.string,
  removable: PropTypes.bool,
  noWrap: PropTypes.bool,
};

export default AvatarImage;
