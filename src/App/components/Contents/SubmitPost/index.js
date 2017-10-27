/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/server';
import Select from 'react-select';
import cx from 'classnames';
import qs from 'qs';
// import Recaptcha from 'react-recaptcha';
import { Link } from 'react-router-dom';
import { medium, mediumInsertConfig } from './config';
import AvatarImage from '../../AvatarImage';
import SelectSearchForum from './SelectSearchForum';
import debug from 'debug';
import './index.scss';
const errorLog = debug('vn:front:error');

class EditorBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'editor',
      isAnnounce: false,
      isLoadingUrl: false,
      isLoadedUrl: false,
      successUrl: false,
      loadedUrlMeta: null,
    };

    this.postEditor = null;
    this.urlInput = null;

    this.toggleAnnounce = this.toggleAnnounce.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.modPost = this.modPost.bind(this);
    this.removeContent = this.removeContent.bind(this);
    this.getUrlPost = this.getUrlPost.bind(this);
    this.selectEditor = this.selectEditor.bind(this);
    this.selectUrl = this.selectUrl.bind(this);
    this.createUrlMetaContent = this.createUrlMetaContent.bind(this);
    this.setUrlMetaContent = this.setUrlMetaContent.bind(this);
    this.checkTitleAndContent = this.checkTitleAndContent.bind(this);
    this.handleRecaptcha = this.handleRecaptcha.bind(this);
    this.checkForumManager = this.checkForumManager.bind(this);
    this.createThumbnailImages = this.createThumbnailImages.bind(this);
    this.setRepresentImage = this.setRepresentImage.bind(this);
    this.fixBackspace = this.fixBackspace.bind(this);

  }

  componentDidMount() {
    // set leave delete

    const dom = this.postEditor;
    this.editor = new MediumEditor(dom, medium);  // eslint-disable-line no-undef
    this.editor.subscribe('editableInput', (data, editable) => {
      this.handleContent();
    });
    $(dom).mediumInsert(mediumInsertConfig(this));

    // init content
    if (this.props.SubmitPostStore.get('server') === 'update') {
      const initContent = this.props.SubmitPostStore.get('content');
      if (initContent) {
        this.editor.setContent(initContent);
      }

      // bug. if update add overlay
      $('.medium-insert-embeds')
        .append('<div class="medium-insert-embeds-overlay"></div>');
    }

    this.props.FireRemoveServerInit();
  }

  componentWillReceiveProps(nextProps) {
    // init from server
    if (nextProps.SubmitPostStore.get('server') === 'update') {
      const initContent = nextProps.SubmitPostStore.get('content');
      if (initContent) {
        this.editor.setContent(initContent);
      }

      nextProps.FireRemoveServerInit();
    }

    // check update post success
    if (nextProps.SubmitPostStore.get('successUpdatePost') === true) {
      nextProps.history.replace(
        '/club/' + nextProps.SubmitPostStore.get('successForumId') +
        '?postId=' + nextProps.SubmitPostStore.get('successPostId')
      );
    }
  }

  componentWillUnmount() {
    this.editor.destroy();

    const {SubmitPostStore, FireRequestDeleteUnUsingImage} = this.props;
    const postImages = SubmitPostStore.get('postImages');
    if (postImages && postImages.size) {

      FireRequestDeleteUnUsingImage(postImages.toJS());

    } else {
      return true;
    }
  }

  toggleAnnounce() {

    this.setState({isAnnounce: !this.state.isAnnounce});
  }

  handleContent() {
    let allContents = this.editor.serialize();
    let el = allContents['post_editor'].value;

    if (el === '') {
      el = '<p class="medium-insert-active"><br></p>';
    }

    this.props.FireHandlePostContent({
      content: el,
      width: this.postEditor.offsetWidth,
      height: this.postEditor.offsetHeight,
    });
  }

  submitPost() {
    const {SubmitPostStore, UserStore, location, FireRequestSubmitPost} = this.props;

    const skills = UserStore.get('skills');
    const writePost = skills
      .filter(skill => skill.getIn(['skill', 'name']) === 'write_post')
      .get(0);

    function checkSkillAvailable(writePostSkill) {

      const property = writePostSkill.getIn(['skill', 'property']);
      const cooltime = property.get('cooltime');
      const usingAt = writePostSkill.get('using_at');

      if (usingAt === null) {
        return true;
      }

      if (cooltime && usingAt) {
        const gapSec = (new Date() - new Date(usingAt)) / 1000;
        if (gapSec > cooltime) {
          return true;
        }
      }

      return false;
    }

    const result = checkSkillAvailable(writePost);

    if (result) {
      const title = SubmitPostStore.get('title');
      const content = SubmitPostStore.get('content');
      if (title && content) {
        let newPost = {
          title: title,
          content: content,
          prefixId: SubmitPostStore.get('selectPrefixId'),
          query: qs.parse(location.search.slice(1)),
          isAnnounce: this.state.isAnnounce,
          width: SubmitPostStore.get('width'),
          height: SubmitPostStore.get('height'),
          postImages: SubmitPostStore.get('postImages') || null,
          representingImage: (SubmitPostStore.get('representingImage') ===
          undefined || SubmitPostStore.get('representingImage') === null)
            ? null
            : SubmitPostStore.get('postImages')
              .get(SubmitPostStore.get('representingImage')),
        };

        FireRequestSubmitPost(newPost);
      }
    } else {
      errorLog('not available');
    }
  }

  modPost() {
    const {SubmitPostStore, location, FireRequestUpdatePost} = this.props;

    const title = SubmitPostStore.get('title');
    const content = SubmitPostStore.get('content');

    if (title && content) {
      let newPost = {
        postId: SubmitPostStore.get('postId'),
        title: title,
        content: content,
        prefixId: SubmitPostStore.get('selectPrefixId'),
        query: qs.parse(location.search.slice(1)),
        isAnnounce: this.state.isAnnounce,
        width: SubmitPostStore.get('width'),
        height: SubmitPostStore.get('height'),
      };

      FireRequestUpdatePost(newPost);
    }
  }

  removeContent() {
    this.props.FireHandleResetPostContent();
    this.editor.setContent(null);
  }

  getUrlPost() {

    const url = this.urlInput.value.trim();
    this.props.FireRequestGetPostMeta({url});
  }

  selectEditor() {

    this.setState({type: 'editor'});
  }

  selectUrl() {

    this.setState({type: 'url'});
  }

  createUrlMetaContent(urlMetaData, askButton) {

    return (
      <div className="url-meta-data-box">
        <a href={urlMetaData.get('url')} target="_blank" rel='noopener noreferrer'>
          <div className="ui items">
            <div className="item">
              {
                urlMetaData.get('image') &&
                <div className="image">
                  <img src={urlMetaData.get('image')}/>
                </div>
              }
              <div className="content">
                <div className="header">{urlMetaData.get('title')}</div>
                <div className="meta">
                  <p>{(urlMetaData.get('siteName') ||
                  urlMetaData.getIn(['uri', 'host']))}</p>
                </div>
                <div className="description">
                  <p>{urlMetaData.get('description')}</p>
                </div>
                {
                  askButton &&
                  <div className="extra">
                    <div className="ui right floated button"
                         onClick={this.setUrlMetaContent}>
                      링크 사용
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </a>
      </div>);
  }

  setUrlMetaContent(e) {
    e.preventDefault();
    e.stopPropagation();

    const urlMetaData = this.props.SubmitPostStore.get('urlMetaData');
    const box = this.createUrlMetaContent(urlMetaData, false);

    this.props.FireHandlePostContent(
      {content: ReactDOM.renderToStaticMarkup(box)});
  }

  checkTitleAndContent() {

    const {SubmitPostStore} = this.props;
    return !SubmitPostStore.get('title') ||
      !$(SubmitPostStore.get('content')).text().trim();
  }

  handleRecaptcha(a, b, c, d) {

    const args = Array.prototype.slice.call(arguments, 1);

    errorLog(args, a, b, c, d);
  }

  checkForumManager(user, managers) {

    const key = managers.findKey(u => u.get('id') === user.get('id'));
    if (key === undefined) {
      return false;
    } else {
      return user;
    }
  }

  createThumbnailImages(image, index)  {
    const isRepresent = this.props.SubmitPostStore.get('representingImage') ===
      index;
    const style = cx('image_item select_represent', {
      select_represent: isRepresent,
    });
    return (
      <li className={style}
          key={image.key}
          onClick={this.setRepresentImage.bind(this, index)}
      >
        {
          isRepresent &&
          <div className="represent_box">대표</div>
        }
        <img src={image.thumbnailUrl}/>
      </li>
    );
  }

  setRepresentImage(index) {

    this.props.FireHandleSetRepresentImage(index);
  }

  fixBackspace(e) {
    const firstParagragh = e.target.querySelector('p');
    if (!firstParagragh) {
      this.editor.setContent('<p class="medium-insert-active"></p>');
    }
  }

  render() {

    const {SubmitPostStore, UserStore} = this.props;
    const type = SubmitPostStore.get('type');
    const urlMetaData = SubmitPostStore.get('urlMetaData');
    const announces = SubmitPostStore.getIn(['forum', 'announces']);
    const announcesLength = (announces && announces.size)
      ? announces.size
      : 0;
    const managers = SubmitPostStore.getIn(['forum', 'managers']);

    const isManager = this.checkForumManager(UserStore.get('user'), managers);

    const displayEditor = cx('ui description submit_post_box', {
      hide: this.state.type !== 'editor',
    });
    const displayUrl = cx('', {
      hide: this.state.type !== 'url',
    });
    const editorActive = cx('item', {
      active: this.state.type === 'editor',
    });
    const urlActive = cx('item', {
      active: this.state.type === 'url',
    });
    const titleAndContentActiveButton = cx('ui primary button', {
      disabled: this.checkTitleAndContent(),
    });

    let urlMetaDataBox;
    if (urlMetaData && urlMetaData.size) {
      urlMetaDataBox = this.createUrlMetaContent(urlMetaData, true);
    }

    return (
      <div className="editor-box">

        <div className="ui labeled icon menu editor-type-menu">
          <a className={editorActive} onClick={this.selectEditor}>
            <i className="pencil icon"/>
            에디터
          </a>
          <a className={urlActive} onClick={this.selectUrl}>
            <i className="chain icon"/>
            URL
          </a>
        </div>

        <div className={displayEditor}>
          <div id="post_editor_background">
            <div className="editor_left_padding">
              <div
                ref={r => this.postEditor = r}
                onKeyDown={this.fixBackspace}
                className="post_editor"
                id="post_editor"
                placeholder="텍스트를 입력하세요"
              />
            </div>
          </div>

          {
            SubmitPostStore.get('postImages') &&
            SubmitPostStore.get('postImages').size > 0 &&
            <div className="submit_images">
              <div className="header">
                <h4>대표 이미지</h4>
                <p>대표 이미지를 설정해주세요</p>
              </div>
              <ul className="image_list">
                {
                  SubmitPostStore.get('postImages')
                    .map(this.createThumbnailImages)
                }
              </ul>
            </div>
          }
        </div>

        <div className={displayUrl}>
          <div className="ui action input">
            <input ref={r => this.urlInput = r} type="text" placeholder="주소를 입력하세요"/>
            <button className="ui button" onClick={this.getUrlPost}>확인</button>
          </div>

          { urlMetaDataBox }

        </div>

        {/* <TagList items={Tags} /> */}

        {
          (announcesLength < 5) && (isManager) &&
          <div className="ui checkbox">
            <input id="is_announce" type="checkbox"
                   onChange={this.toggleAnnounce}/>
            <label htmlFor="announce_check">공지 글
              ({`${announcesLength} / 5`})</label>
          </div>
        }

        <div className="submit_button_box">
          {
            (type === 'write') &&
            <button className={titleAndContentActiveButton}
                    onClick={this.submitPost}>
              저장하기
            </button>
          }
          {
            (type === 'mod') &&
            <button className={titleAndContentActiveButton}
                    onClick={this.modPost}>
              수정하기
            </button>
          }
          <button className="ui button" onClick={this.removeContent}>
            다시 쓰기
          </button>
        </div>

      </div>
    );
  }
}

EditorBox.displayName = 'EditorBox';
EditorBox.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  SubmitPostStore: PropTypes.object.isRequired,
  UserStore: PropTypes.object.isRequired,
  FireRemoveServerInit: PropTypes.func.isRequired,
  FireHandlePostTitle: PropTypes.func.isRequired,
  FireHandlePostContent: PropTypes.func.isRequired,
  FireHandleResetPostContent: PropTypes.func.isRequired,
  FireRequestSubmitPost: PropTypes.func.isRequired,
  FireHandleSelectPrefix: PropTypes.func.isRequired,
  FireHandleAddPostImages: PropTypes.func.isRequired,
  FireHandleDeletePostImages: PropTypes.func.isRequired,
  FireHandleSetRepresentImage: PropTypes.func.isRequired,
  FireRequestDeleteUnUsingImage: PropTypes.func.isRequired,
  FireRequestUpdatePost: PropTypes.func.isRequired,
  FireRequestGetPostMeta: PropTypes.func.isRequired,
};

require('./index.scss');
class SubmitContents extends React.Component {
  constructor(props) {
    super(props);

    this.inputTitle = null;

    this.handleTitle = this.handleTitle.bind(this);
    this.handlePrefix = this.handlePrefix.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.SubmitPostStore.get('submitSuccess') &&
      nextProps.SubmitPostStore.get('submitSuccess')) {
      nextProps.history.replace(
        '/club/' + nextProps.SubmitPostStore.get('forumId') +
        '?postId=' + nextProps.SubmitPostStore.get('postId')
      );
    }
  }

  handleTitle() {
    this.props.FireHandlePostTitle(this.inputTitle.value);
  }

  handlePrefix(option) {
    if (option) {
      this.props.FireHandleSelectPrefix(option.value);
    } else if (option === null) {
      this.props.FireHandleSelectPrefix(null);
    }
  }

  render() {
    const {
      history,
      ForumCreated, ForumFollowed, RankForums,
      AuthStore, UserStore, SubmitPostStore,
    } = this.props;

    const isLogin = AuthStore.get('isLogin');

    const forumInfo = SubmitPostStore.get('forum');

    if (isLogin) {
      const prefixesData = SubmitPostStore.get('prefixes');
      const user = UserStore.get('user');
      const profile = UserStore.get('profile');
      const icon = UserStore.get('icon');
      const sex = profile.get('sex'),
        avatar_img = profile.get('avatar_img'),
        icon_img = icon ? icon.get('img') : null;

      let iconImg, options;

      if (icon_img) {
        iconImg = <img id="user_icon_img" src={'/images/' + icon_img}/>;
      }

      let prefixes = [];
      if (prefixesData) {
        prefixes = prefixesData.toJS();
        options = prefixes.map(function(item) {
          let result = {};
          for (let key in item) {
            if (item.hasOwnProperty(key)) {
              const k = key === 'id' ? 'value' : (key === 'name'
                ? 'label'
                : key);
              result[k] = item[key];
            }
          }
          return result;
        });
      }

      if (!forumInfo) {
        return (
          <SelectSearchForum
            history={history}
            ForumFollowed={ForumFollowed}
            ForumCreated={ForumCreated}
            RankForums={RankForums}
          />
        );
      }

      return (
        <div id="submit_box">
          <div className="box">
            <div className={'post_item'}>

              {/* submit header */}
              <div className="submit_header">
                <i className="fa fa-files-o" />
                <Link to={`/club/${forumInfo.get('id')}`} >{forumInfo.get('title')}</Link>
              </div>

              {/* header form */}
              <div className="post_header">
                {/* avatar */}
                <div className="ui image tiny" style={{width: 55}}>
                  <AvatarImage
                    sex={sex}
                    avatarImg={avatar_img}
                  />
                </div>

                <div className="input_form_box">
                  <div className="input_form_header">
                    {
                      prefixes &&
                      <Select
                        name="select_prefix"
                        value={SubmitPostStore.get('selectPrefixId')}
                        placeholder="말머리 선택"
                        noResultsText="말머리가 없습니다"
                        options={options}
                        onChange={this.handlePrefix}
                      />
                    }
                    <div className="ui input">
                      <input ref={r => this.inputTitle = r}
                             id="post_submit_title"
                             type="text"
                             placeholder="제목을 입력하세요"
                             value={SubmitPostStore.get('title')}
                             onChange={this.handleTitle}/>
                    </div>
                  </div>

                  <div className="best_post_meta">
                    <div className="author_nick">
                      {user.get('nick')}
                    </div>
                    <div className="author_icon">
                      {iconImg}
                    </div>
                  </div>
                </div>
              </div>

              <EditorBox
                {...this.props}
              />

            </div>
          </div>
        </div>
      );

    } else {
      return (
        <div style={{padding: 10}}>
          <div className="ui segment">
            안녕하세요 베나클 입니다.
            로그인을 해주세요
          </div>
        </div>
      );
    }
  }
}

SubmitContents.displayName = 'SubmitContents';
SubmitContents.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  AuthStore: PropTypes.object.isRequired,
  UserStore: PropTypes.object.isRequired,
  SubmitPostStore: PropTypes.object.isRequired,
  ForumFollowed: PropTypes.object.isRequired,
  ForumCreated: PropTypes.object.isRequired,
  RankForums: PropTypes.object.isRequired,

  FireRemoveServerInit: PropTypes.func.isRequired,
  FireHandlePostContent: PropTypes.func.isRequired,
  FireHandlePostTitle: PropTypes.func.isRequired,
  FireHandleResetPostContent: PropTypes.func.isRequired,
  FireRequestSubmitPost: PropTypes.func.isRequired,
  FireHandleSelectPrefix: PropTypes.func.isRequired,
  FireHandleAddPostImages: PropTypes.func.isRequired,
  FireHandleDeletePostImages: PropTypes.func.isRequired,
  FireHandleSetRepresentImage: PropTypes.func.isRequired,
  FireRequestDeleteUnUsingImage: PropTypes.func.isRequired,
  FireRequestUpdatePost: PropTypes.func.isRequired,
  FireRequestGetPostMeta: PropTypes.func.isRequired,
};

export default SubmitContents;
