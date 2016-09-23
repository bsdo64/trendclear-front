import React, {Component} from 'react';
import {Link} from 'react-router';
import {Scrollbars} from 'react-custom-scrollbars';

import FlatButton from './FlatButton';
import TrendBox from './TrendBox';
import Main2 from '../Ad/Main2';

require('./index.scss');

class WidgetBox extends Component {
  render() {
    const {LoginStore, UserStore, location} = this.props;
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

    const submitLink = location.query.forumId
      ? `/community/submit?forumId=${location.query.forumId}`
      : '/community/submit';

    return (
      <div id="section_cldmm">

        {
          !isLogin &&
          [
            <FlatButton
              key="1"
              linkTo="/signin"
              text="지금 가입하세요 !"
            />
          ]
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
            linkTo={submitLink}
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
          [
            <div key="1" id="my_forum">
              <div className="header">
                내 게시판
              </div>
              <Scrollbars
                autoHide={true}
                autoHideTimeout={1000}
                autoHideDuration={200}
                autoHeight
                autoHeightMin={50}
                autoHeightMax={200}
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
          ]
        }

        {
          <Main2
            key="Main2"
            url="https://s-media-cache-ak0.pinimg.com/236x/d5/87/49/d5874925758d37d00237c1e527821375.jpg"
          />
        }

        <div className="_45mq" role="contentinfo" style={{marginTop: 20, fontSize: 12}}>
          <div className="fsm fwn fcg">
            <Link to="/policies/privacy">개인정보보호</Link>
            <span role="presentation" aria-hidden="true"> · </span>
            <Link to="/policies/terms">약관</Link>
            {/*<span role="presentation" aria-hidden="true"> · </span>
            <Link to="/advertisement">광고안내</Link>*/}
            <span role="presentation" aria-hidden="true"> · </span>
            <Link to="/about">회사소개</Link>
            {/*<span role="presentation" aria-hidden="true"> · </span>
            <Link to="/careers">채용</Link>*/}
            <span role="presentation" aria-hidden="true"> · </span>
            <Link to="/help">고객센터</Link>
          </div>
          <div>
            <span> Venacle © 2016</span>
          </div>
        </div>
      </div>
    );
  }
}

export default WidgetBox;