import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

class BanList extends React.Component {
  constructor(props) {
    super(props);

    this.selectUser = this.selectUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.createUserItem = this.createUserItem.bind(this);
  }
  
  componentDidMount() {
    const forumId = qs.parse(this.props.location.search.slice(1)).forumId;

    $('.ui.search')
      .search({
        apiSettings: {
          url: '/ajax/search/users?type=banList&nick={query}&forumId=' +
          forumId,
        },
        cache: false,
        minCharacters: 2,
        fields: {
          title: 'nick',
        },
        error: {
          source: '검색 할 수 없습니다 API를 참고하세요',
          noResults: '일치하는 닉네임이 없습니다',
          logging: 'Error in debug logging, exiting.',
          noEndpoint: 'No search endpoint was specified',
          noTemplate: 'A valid template name was not specified.',
          serverError: '서버에러 입니다.',
          maxResults: 'Results must be an array to use maxResults setting',
          method: 'The method you called is not defined.',
        },
        onSelect: (user) => {

          this.selectUser(user);
        },
      });
  }

  selectUser(user) {
    const {location, FireRequestAddForumBanUser} = this.props;
    const forumId = qs.parse(location.search.slice(1)).forumId;
    FireRequestAddForumBanUser({userId: user.id, forumId: forumId});
  }

  removeUser(user) {
    const {location, FireRequestDeleteForumBanUser} = this.props;
    const forumId = qs.parse(location.search.slice(1)).forumId;

    FireRequestDeleteForumBanUser({
      forumId: forumId,
      userId: user.get('id'),
    });
  }

  createUserItem(id) {
    const {Users} = this.props;
    const user = Users.get(id.toString());

    if (user) {
      return (
        <div className="item padded" key={id} style={{paddingBottom: 5}}>
          <a className="ui label large">
            <span className="title">{user.get('nick')}</span>
            <i className="fa fa-remove"
               onClick={this.removeUser.bind(this, user)}/>
          </a>
        </div>
      );
    }
  }

  render() {
    const {Forums, location} = this.props;
    const forumId = qs.parse(location.search.slice(1)).forumId;
    const forum = Forums.get(forumId.toString());
    const banUserIds = forum.get('bans');

    return (
      <div className="ui container" style={{padding: 10}}>
        <div className="ui segments ">
          <div className="ui segment"><h3 className="ui header">벤 유저 설정</h3>
            <div className="ui divider"/>
            <div className="ui list">
              <a className="item">
                <i className="right triangle icon"/>
                <div className="content">
                  <div className="header">베나클과 커뮤니티의 목적에 맞지 않는 유저를 영구 벤 할수 있습니다</div>
                </div>
              </a>
              <a className="item">
                <i className="help icon"/>
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
                      <input className="prompt" type="text"
                             placeholder="유저 검색"/>
                      <i className="user icon"/>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <h4>벤 유저 리스트</h4>
                  <div className="ui list">
                    {
                      banUserIds &&
                      banUserIds.map(this.createUserItem)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BanList.displayName = 'BanList';
BanList.propTypes = {
  location: PropTypes.object.isRequired,
  Users: PropTypes.object.isRequired,
  Forums: PropTypes.object.isRequired,
  FireRequestAddForumBanUser: PropTypes.func.isRequired,
  FireRequestDeleteForumBanUser: PropTypes.func.isRequired,
};

export default BanList;
