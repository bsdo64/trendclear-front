import React from 'react';
import PropTypes from 'prop-types';

class ForumInfo extends React.Component {
  constructor(props) {
    super(props);

    this.updateForumInfo = this.updateForumInfo.bind(this);
    this.uploadClubImage = this.uploadClubImage.bind(this);
    this.changeForm = this.changeForm.bind(this);
  }

  componentWillUnmount() {
    this.props.FireHandleResetButton();
  }

  updateForumInfo(e) {
    e.preventDefault();
    e.stopPropagation();

    const {ForumSettingStore, FireRequestUpdateForumMeta} = this.props;
    const forumInfo = ForumSettingStore.get('forumInfo');
    const forum = ForumSettingStore.get('forum');

    FireRequestUpdateForumMeta({
      id: forum.get('id'),
      sub_header: forumInfo ? forumInfo.get('forum_sub_header') : forum.get('sub_header'),
      description: forumInfo ? forumInfo.get('forum_description') : forum.get('description'),
      rule: forumInfo ? forumInfo.get('forum_rule') : forum.get('rule'),
      forum_image: forumInfo ? forumInfo.get('forum_image'): forum.get('forum_image'),
    });
  }

  changeForm(e) {
    this.props.FireHandleChangeFormForumMeta(
      {[e.target.name]: e.target.value.trim()});
  }

  uploadClubImage(e) {
    e.preventDefault();
    e.stopPropagation();

    const forum = this.props.ForumSettingStore.get('forum');
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {

      this.props.FireRequestPostForumImage({
        id: forum.get('id'),
        forum_image: file,
        beforeImage: forum.get('forum_image')
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const {ForumSettingStore} = this.props;
    const forum = ForumSettingStore.get('forum');

    if (forum) {
      const patch = ForumSettingStore.getIn(['forumInfo', 'success']);
      const patchSuccess = patch === 'updated'
        ? true
        : patch === 'failed'
          ? false
          : null;
      let button;

      if (patchSuccess === true) {
        button = <div className="ui submit button positive">변경 완료</div>;
      } else if (patchSuccess === false) {
        button = <button type="submit" className="ui submit button negative">변경
          실패</button>;
      } else if (patchSuccess === null) {
        button =
          <button type="submit" className="ui submit button primary">
            변경</button>;
      }

      return (
        <div className="ui container" style={{padding: 10}}>
          <div className="ui segment">
            <h3 className="ui header">게시판 정보</h3>
            <div className="ui divider"/>
            <div className="ui list">
              <a className="item"><i className="right triangle icon"/>
                <div className="content">
                  <div className="header">기존 게시판 정보를 수정합니다.</div>
                  <div className="description"> - 게시판 이름은 변경할 수 없습니다</div>
                </div>
              </a>
            </div>
            <form id="create_forum" className="ui form"
                  onSubmit={this.updateForumInfo}
                  onChange={this.changeForm}>

              <div className="field" style={{float: 'right'}}>
                <label>클럽 이미지</label>
                <img src={`${forum.get('forum_image') ? '/image/uploaded/files/avatar1/' + forum.get('forum_image') : '/images/empty-club-image.png' }`} />
                <input
                  onChange={this.uploadClubImage}
                  type="file" name="forum_image" style={{width: 200, border: 'none'}}/>
              </div>
              <div className="field" style={{clear: 'none'}}>
                <label>이름 *</label>
                {forum.get('title')}
              </div>
              <div className="field">
                <label>부제 : </label>
                <input type="text" defaultValue={forum.get('sub_header')}
                       name="forum_sub_header"/>
              </div>
              <div className="field">
                <label>설명 *</label>
                <input type="text" defaultValue={forum.get('description')}
                       name="forum_description"/>
              </div>
              <div className="field">
                <label>규칙 *</label>
                <textarea name="forum_rule" defaultValue={forum.get('rule')}/>
              </div>
              <div className="ui error message"/>
              {button}
            </form>
          </div>
        </div>
      );
    }

    return <div/>;
  }
}

ForumInfo.propTypes = {
  ForumSettingStore: PropTypes.object.isRequired,
  FireHandleResetButton: PropTypes.func.isRequired,
  FireHandleChangeFormForumMeta: PropTypes.func.isRequired,
  FireRequestUpdateForumMeta: PropTypes.func.isRequired,
  FireRequestPostForumImage: PropTypes.func.isRequired,
};

export default ForumInfo;
