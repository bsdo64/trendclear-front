import React from 'react';
import ForumSettingActions from '../../../../Actions/ForumSettingActions';

const BanList = React.createClass({
  componentDidMount() {
    const self = this;

    $('.ui.search')
      .search({
        apiSettings: {
          url: '/ajax/search/users?type=banList&nick={query}'
        },
        minCharacters : 2,
        fields: {
          title: 'nick'
        },
        error : {
          source      : '검색 할 수 없습니다 API를 참고하세요',
          noResults   : '일치하는 닉네임이 없습니다',
          logging     : 'Error in debug logging, exiting.',
          noEndpoint  : 'No search endpoint was specified',
          noTemplate  : 'A valid template name was not specified.',
          serverError : '서버에러 입니다.',
          maxResults  : 'Results must be an array to use maxResults setting',
          method      : 'The method you called is not defined.'
        },
        onSelect: function (user) {
          "use strict";

          self.selectUser(user);
        }
      });
  },

  selectUser(user) {
    "use strict";

    const forumId = this.props.location.query.forumId;
    ForumSettingActions.addBanUser({userId: user.id, forumId: forumId});
  },

  render() {
    const {Users, Forums, location} = this.props;
    const forumId = location.query.forumId;
    const forum = Forums.get(forumId.toString());
    const banUserIds = forum.get('bans');

    return (
      <div className="ui container" style={{margin: 10, width: 700}}>
        <div className="ui segments ">
          <div className="ui segment"><h3 className="ui header">벤 유저 설정</h3>
            <div className="ui divider"></div>
            <div className="ui list"><a className="item"><i className="right triangle icon"></i>
              <div className="content">
                <div className="header">베나클과 커뮤니티의 목적에 맞지 않는 유저를 영구 벤 할수 있습니다</div>
              </div>
            </a><a className="item"><i className="help icon"></i>
              <div className="content">
                <div className="description">관리자가 허용하기 전까지 게시판의 접속이 불가합니다</div>
              </div>
            </a>
            </div>
            <div className="ui two column grid">
              <div className="row">
                <div className="column">
                  <h4>벤 유저 추가</h4>
                  <div className="ui search">
                    <div className="ui left icon input">
                      <input className="prompt" type="text" placeholder="Search GitHub" />
                      <i className="github icon" />
                    </div>
                  </div>
                </div>
                <div className="column">
                  <h4>벤 유저 리스트</h4>
                  <ul>
                    {
                      banUserIds &&
                      banUserIds.map(id => {
                        "use strict";
                        const user = Users.get(id.toString());

                        if (user) {
                          return (
                            <li key={user.get('id')}>{user.get('nick')}</li>
                          )
                        }
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default BanList;
