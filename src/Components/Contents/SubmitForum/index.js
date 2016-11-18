import React, { PropTypes } from 'react';
import marked from '../../Lib/Marked';
import ForumActions from '../../../Actions/ForumActions';

const SubmitForumBox = React.createClass({
  propTypes: {
    SubmitForumStore: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
  },

  componentDidMount() {
    $('.ui.form')
      .form({
        fields: {
          title: {
            identifier: 'forum_title',
            rules: [
              {
                type: 'empty',
                prompt: '게시판 이름을 입력하세요'
              },
              {
                type: 'regExp[/^[가-힣a-z0-9_]{2,14}$/]',
                prompt: '한글, 영문 2-14 내로 입력해주세요'
              }
            ]
          },
          sub_header: {
            identifier: 'forum_sub_header',
          },
          description: {
            identifier: 'forum_description',
            rules: [
              {
                type: 'empty',
                prompt: '게시판 설명을 입력하세요'
              }
            ]
          },
          rule: {
            identifier: 'forum_rule',
            rules: [
              {
                type: 'empty',
                prompt: '게시판 규칙을 입력하세요'
              }
            ]
          }
        },
        inline: true,
        on: 'blur',
        onSuccess: (e, fields) => {
          e.preventDefault();
          e.stopPropagation();

          const { SubmitForumStore } = this.props;
          const error = SubmitForumStore.getIn(['form', 'error']);

          if (!error) {
            const formValue = {
              title: fields.forum_title,
              sub_header: fields.forum_sub_header,
              description: fields.forum_description,
              rule: fields.forum_rule
            };

            ForumActions.createForum(formValue);
          }
        }
      });
  },

  getInitialState: function () {
    return { value: '' };
  },
  handleChange: function () {
    this.setState({ value: this.refs.rule_textarea.value });
  },
  rawMarkup: function () {
    return { __html: marked(this.state.value, { breaks: true }) };
  },

  validate(e) {

    if (e.target.value.length > 1) {
      ForumActions.validateBeforeCreateForum({
        title: e.target.value.trim()
      });
    }
  },

  render() {
    const { SubmitForumStore, UserStore } = this.props;

    const trendbox = UserStore.get('trendbox');
    if (!trendbox) {
      return <div>로그인을 해주세요</div>
    }

    const canCreate = trendbox.get('level') >= 5 && trendbox.get('T') >= 100;
    const duplicateTitleError = SubmitForumStore.getIn(['form', 'error']);

    let validateError;
    if (duplicateTitleError || !canCreate) {
      validateError = (
        <div className="ui error message" style={{ display: 'block' }}>
          <ul className="list">
            {
              duplicateTitleError &&
              <li>이미 존재하는 제목 입니다</li>
            }
            {
              !canCreate &&
              <li>생성 가능 레벨과 포인트를 확인해주세요</li>
            }
          </ul>
        </div>
      );
    }

    return (
      <div className="ui container" style={{ margin: 10, width: 700 }}>
        <div className={"ui segments "}>

          <div className={"ui segment"}>
            <h3 className="ui header">게시판 생성</h3>
            <div className="ui divider"></div>
            <div className="ui list">
              <a className="item">
                <i className="right triangle icon"></i>
                <div className="content">
                  <div className="header">사람들과 의견을 나누고 싶은 게시판을 생성하세요</div>
                  <div className="description">어떤 주제든 상관없습니다</div>
                </div>
              </a>
              <a className="item">
                <i className="help icon"></i>
                <div className="content">
                  <div className="description">게시판 이름은 중복이 허용되지 않습니다</div>
                </div>
              </a>
              <a className="item">
                <i className="help icon"></i>
                <div className="content">
                  <div className="description">게시판 규칙은
                    <a href="https://namu.wiki/w/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4" target="_blank"> Markdown </a>
                    을 지원합니다
                  </div>
                </div>
              </a>
              <a className="item">
                <i className="help icon"></i>
                <div className="content">
                  <div className="description">
                    게시판을 생성하기 위해 <b>레벨 5 이상, 100 포인트</b>가 필요합니다.
                  </div>
                </div>
              </a>
            </div>

            {/* 게시판 입력 폼 */}
            <form id="create_forum" className="ui form">
              <div className="field">
                <label>이름 *</label>
                <input name="forum_title" type="text" onChange={this.validate}/>
              </div>
              <div className="field">
                <label>부제 :</label>
                <input name="forum_sub_header" type="text"/>
              </div>
              <div className="field">
                <label>설명 *</label>
                <input name="forum_description" type="text"/>
              </div>
              <div className="field">
                <label>규칙 *</label>
                <textarea name="forum_rule"
                          onChange={this.handleChange}
                          ref="rule_textarea"
                          defaultValue={this.state.value}/>
              </div>
              <h5>클럽 규칙</h5>
              <div
                className="markdown_output"
                style={{ paddingBottom: 10 }}
                dangerouslySetInnerHTML={this.rawMarkup()}
              />

              {validateError}

              {
                canCreate &&
                <div className={"ui submit button primary"}>확인</div>
              }
            </form>
          </div>

        </div>
      </div>
    )
  }
});

export default SubmitForumBox;
