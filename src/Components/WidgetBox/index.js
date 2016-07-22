import React, {Component} from 'react';

import SigninButton from './SigninButton';
import TrendBox from './TrendBox';

if (process.env.browser === true) {
  require('./index.scss');
}

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
          <SigninButton />
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