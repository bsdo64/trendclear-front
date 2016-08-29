import React from 'react';
import ImageType from '../Lib/ImageType';

const AvatarImage = (props) => {
  const { avatarImg, sex, imageClass = '' } = props;

  if (avatarImg) {
    const imageType = new ImageType('/image/uploaded/files/' + avatarImg);
    const type = imageType.getImageType();

    if (type === 'gif') {
      return <img className={imageClass} src={'/image/uploaded/files/' + avatarImg} />;
    } else {
      return <img className={imageClass} src={'/image/uploaded/files/small/' + avatarImg} />;
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
