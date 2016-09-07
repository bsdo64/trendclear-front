import React from 'react';

import ForumActions from '../../../../Actions/ForumActions';
import ForumSettingActions from '../../../../Actions/ForumSettingActions';

import Forum from '../../Community/Forum';

const Announce = React.createClass({
  componentWillUnmount() {
    ForumSettingActions.resetButton();
  },

  updateAnnounce(e) {
    e.preventDefault();
    e.stopPropagation();

    const {ForumSettingStore} = this.props;
    const forumInfo = ForumSettingStore.get('forumInfo');
    const forum = ForumSettingStore.get('forum');

    ForumActions.patchForum({
      id: forum.get('id'),
      sub_header: forumInfo ? forumInfo.get('forum_sub_header') : forum.get('sub_header'),
      description: forumInfo ? forumInfo.get('forum_description') : forum.get('description'),
      rule: forumInfo ? forumInfo.get('forum_rule') : forum.get('rule')
    })
  },

  changeForm(e) {
    ForumSettingActions.changeForumData({[e.target.name]: e.target.value.trim()})
  },

  render() {
    const {ForumSettingStore} = this.props;
    const forum = ForumSettingStore.get('forum');

    if (forum) {
      const patch = ForumSettingStore.getIn(['forumInfo', 'success']);
      const patchSuccess = patch === 'updated' ? true : patch === 'failed' ? false : null;
      let button;
      
      if (patchSuccess === true) {
        button = <div className="ui submit button positive">변경 완료</div>
      } else if (patchSuccess === false) {
        button = <button type="submit" className="ui submit button negative">변경 실패</button>
      } else if (patchSuccess === null) {
        button = <button type="submit" className="ui submit button primary">변경</button>
      }

      return (
        <div className="ui container" style={{margin: 10, width: 700}}>
          <div className="ui segments ">
            <div className="ui segment">
              <h3 className="ui header">공지글 설정</h3>
              <div className="ui divider"></div>
              <div className="ui list">
                <a className="item"><i className="right triangle icon"></i>
                  <div className="content">
                    <div className="header">공지글을 설정합니다</div>
                    <div className="description"> - 최대 5개의 공지글을 설정할 수 있습니다</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="ui segment">
              <Forum
                {...this.props}
              />
            </div>
          </div>
        </div>
      )
    }

    return <div></div>
  }
});

export default Announce;