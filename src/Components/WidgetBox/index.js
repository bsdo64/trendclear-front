import React, {Component} from 'react';
import {Link} from 'react-router';
import {Scrollbars} from 'react-custom-scrollbars';

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
      forumCreated: UserStore.get('forumCreated'),
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
            linkTo="/community/submit/forum"
            text="커뮤니티 만들기"
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

        {
          isLogin && user && user.forumCreated && user.forumCreated.size > 0 &&
          <div id="my_forum">
            <div className="header">
              내 게시판
            </div>
            <Scrollbars
              style={{ height: 200 }}
              autoHide={true}
              autoHideTimeout={1000}
              autoHideDuration={200}
              universal={true}
            >
              <div className="ui list forum_created_list">
                {
                  user.forumCreated.sortBy(item => item.get('title')).map(forum => {
                    return (
                      <div key={forum.get('id')} className="item">
                        <i className="fa fa-inbox icon" />
                        <div className="content">
                          <div className="header">
                            <Link to={`/community?forumId=${forum.get('id')}`}>
                              {forum.get('title')}
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

            </Scrollbars>
          </div>
        }
      </div>
    );
  }
}

export default WidgetBox;