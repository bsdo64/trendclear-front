import React from 'react';
import PropTypes from 'prop-types';
import marked from '../../Lib/Marked';
import debug from 'debug';
const submitFailLog = debug('vn:api:submitForum');

class SubmitForumBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.rawMarkup = this.rawMarkup.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidUpdate() {
    $(this.form)
      .form('refresh');
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.SubmitForumStore.get('createForumSuccess') &&
      nextProps.SubmitForumStore.get('createForumSuccess')) {
      this.props.history.push(
        `/club/${nextProps.SubmitForumStore.get('createForumSuccess')}`
      );
    }
  }

  componentDidMount() {

    $(this.form)
      .form({
        fields: {
          forum_title: {
            identifier: 'forum_title',
            rules: [
              {
                type: 'empty',
                prompt: '게시판 이름을 입력하세요1',
              },
              {
                type: 'regExp[/^[가-힣A-Za-z0-9_]{2,14}$/]',
                prompt: '한글, 영문 2-14 내로 입력해주세요',
              },
            ],
          },
          forum_sub_header: {
            identifier: 'forum_sub_header',
          },
          forum_description: {
            identifier: 'forum_description',
            rules: [
              {
                type: 'empty',
                prompt: '게시판 설명을 입력하세요',
              },
            ],
          },
          forum_rule: {
            identifier: 'forum_rule',
            rules: [
              {
                type: 'empty',
                prompt: '게시판 규칙을 입력하세요',
              },
            ],
          },
        },
        inline: true,
        on: 'blur',
        onSuccess: (e, fields) => {
          e.preventDefault();
          e.stopPropagation();

          const {SubmitForumStore, FireRequestCreateForum} = this.props;
          const error = SubmitForumStore.getIn(['form', 'error']);

          if (!error) {
            const formValue = {
              title: fields.forum_title,
              sub_header: fields.forum_sub_header,
              description: fields.forum_description,
              rule: fields.forum_rule,
            };

            FireRequestCreateForum(formValue);
          }
        },
        onFailure: (e, fields) => {
          submitFailLog(e, fields);
        },
      });
  }

  handleChange() {
    this.setState({value: this.refs.rule_textarea.value});
  }
  rawMarkup() {
    return {__html: marked(this.state.value, {breaks: true})};
  }

  validate(e) {
    const value = e.target.value.trim();
    const isRegex = /^( ?[a-z가-힣A-Z0-9_]){2,14}$/.test(value);
    if (e.target.value.length > 1 && isRegex) {

      this.props.FireRequestValidateTitleForumCreate({
        title: value,
      });
    }
  }

  render() {
    const {SubmitForumStore, UserStore} = this.props;

    const trendbox = UserStore.get('trendbox');
    if (!trendbox) {
      return <div>로그인을 해주세요</div>;
    }

    const canCreate = trendbox.get('level') >= 5 && trendbox.get('T') >= 100;
    const duplicateTitleError = SubmitForumStore.getIn(['form', 'error']);
    const createFail = SubmitForumStore.get('createForumSuccess') === false;

    let validateError;
    if (duplicateTitleError || !canCreate || createFail) {
      validateError = (
        <div className="ui error message" style={{display: 'block'}}>
          <ul className="list">
            {
              duplicateTitleError &&
              <li>이미 존재하는 제목 입니다</li>
            }
            {
              !canCreate &&
              <li>생성 가능 레벨과 포인트를 확인해주세요</li>
            }
            {
              createFail &&
              <li>게시판 생성이 실패하였습니다</li>
            }
          </ul>
        </div>
      );
    }

    return (
      <div className="containerBox" style={{padding: 10}}>
        <div className={'container'}
             style={{
               padding: 10,
               background: '#fff',
               boxShadow: '1px 1px 1px 0 #c6c6c6'
             }}>

          <h3 className="ui header">게시판 생성</h3>
          <div className="ui divider"></div>
          <div className="ui list">
              <span className="item">
                <i className="right triangle icon"/>
                <div className="content">
                  <div className="header">사람들과 의견을 나누고 싶은 게시판을 생성하세요</div>
                  <div className="description">어떤 주제든 상관없습니다</div>
                </div>
              </span>
            <span className="item">
                <i className="help icon"/>
                <div className="content">
                  <div className="description">게시판 이름은 중복이 허용되지 않습니다</div>
                </div>
              </span>
            <span className="item">
                <i className="help icon"/>
                <div className="content">
                  <div className="description">게시판 규칙은
                    <a
                      href="https://namu.wiki/w/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4"
                      target="_blank"> Markdown </a>
                    을 지원합니다
                  </div>
                </div>
              </span>
            <span className="item">
                <i className="help icon"/>
                <div className="content">
                  <div className="description">
                    게시판을 생성하기 위해 <b>레벨 5 이상, 100 포인트</b>가 필요합니다.
                  </div>
                </div>
              </span>
          </div>

          {/* 게시판 입력 폼 */}
          <form ref={ref => this.form = ref} id="create_forum"
                className="ui form">
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
              style={{paddingBottom: 10}}
              dangerouslySetInnerHTML={this.rawMarkup()}
            />

            {validateError}

            {
              canCreate &&
              <div className={'ui submit button primary'}>확인</div>
            }
          </form>

        </div>
      </div>
    );
  }
}

SubmitForumBox.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  SubmitForumStore: PropTypes.object.isRequired,
  UserStore: PropTypes.object.isRequired,
  FireRequestCreateForum: PropTypes.func.isRequired,
  FireRequestValidateTitleForumCreate: PropTypes.func.isRequired,
};

export default SubmitForumBox;
