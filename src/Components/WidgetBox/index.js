import React, {Component} from 'react';

import FlatButton from './FlatButton';
import TrendBox from './TrendBox';

require('./index.scss');

class WidgetBox extends Component {
  render() {
    const {LoginStore, UserStore} = this.props;
    const isLogin = LoginStore.get('isLogin');
    const user = {
      user: UserStore.get('user'),
      trendbox: UserStore.get('trendbox'),
      profile: UserStore.get('profile'),
      icon: UserStore.get('icon'),
      grade: UserStore.get('grade'),
      skills: UserStore.get('skills'),
    };
    // const logout = LoginStore.get('logout');

    // if (logout) {
    //   location.href = '/';
    // }

    return (
      <div id="section_cldmm">

        {
          !isLogin &&
          <FlatButton
            linkTo="/signin"
            text="지금 가입하세요 !"
          />
        }

        {
          isLogin && user &&
          <FlatButton
            linkTo="/community/submit"
            text="글쓰기"
          />
        }

        {
          isLogin && user &&
          <TrendBox
            user={user}
          />
        }
      </div>
    );
  }
}

export default WidgetBox;