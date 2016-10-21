import React, {Component} from 'react';
import {Link} from 'react-router';
import cx from 'classnames';
import {Scrollbars} from 'react-custom-scrollbars';

import FlatButton from './FlatButton';
import TrendBox from './TrendBox';
import Main2 from '../Ad/Main2';

require('./index.scss');

class WidgetBox extends Component {
  render() {
    const {LoginStore, UserStore, ShoppingStore, location} = this.props;
    const isLogin = LoginStore.get('isLogin');
    const user = {
      user: UserStore.get('user'),
      trendbox: UserStore.get('trendbox'),
      profile: UserStore.get('profile'),
      icon: UserStore.get('icon'),
      grade: UserStore.get('grade'),
      skills: UserStore.get('skills'),
      forumCreated: UserStore.get('forumCreated'),
      forumManaged: UserStore.get('forumManaged'),
      inventories: UserStore.get('inventories'),
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
            ShoppingStore={ShoppingStore}
          />
        }

        {
          isLogin && user && user.forumManaged && user.forumManaged.size > 0 &&
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
                    user.forumManaged.sortBy(item => item.get('title')).map(forum => {
                      const styleActive = cx('', {
                        active: location.query.forumId === forum.get('id').toString()
                      });

                      return (
                        <div key={forum.get('id')} className="item">
                          <i className="fa fa-inbox icon" />
                          <div className="content">
                            <div className="header">
                              <Link to={`/community?forumId=${forum.get('id')}`} className={styleActive}>
                                {forum.get('title')}
                                {
                                  !user.forumCreated.includes(forum) &&
                                  ' (매)'
                                }
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
          <Main2
            key="Main2"
            url="/images/venacle-guide.jpg"
            link="/"
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