/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import ReactDOM from 'react-dom/server';
import Select from 'react-select';
import cx from 'classnames';
import Recaptcha from 'react-recaptcha';
import {mapKeys} from 'lodash';
import {medium, mediumInsertConfig} from './config';

import AvatarImage from '../../AvatarImage';
import SelectSearchForum from './SelectSearchForum';
import PostActions from '../../../Actions/PostActions';

const EditorBox = React.createClass({
  getInitialState() {
    return {
      type: 'editor',
      isAnnounce: false,
      isLoadingUrl: false,
      isLoadedUrl: false,
      successUrl: false,
      loadedUrlMeta: null
    };
  },

  componentDidMount() {
    // set leave delete

    let that = this;
    this.editor = new MediumEditor('#post_editor', medium);
    this.editor.subscribe('editableInput', function (event, editable) {
      "use strict";
      that.handleContent()
    });
    $('#post_editor').mediumInsert(mediumInsertConfig(this.editor));

    // init content
    if (this.props.SubmitStore.get('server') === 'update') {
      const initContent = this.props.SubmitStore.get('content');
      if (initContent) {
        this.editor.setContent(initContent);
      }

      PostActions.removeServerInit();
    } else {
      PostActions.removeServerInit();
    }
  },

  componentWillReceiveProps(nextProps) {
    // init from server
    if (nextProps.SubmitStore.get('server') === 'update') {
      const initContent = nextProps.SubmitStore.get('content');
      if (initContent) {
        this.editor.setContent(initContent);
      }

      PostActions.removeServerInit();
    }
  },

  componentWillUnmount() {
    this.editor.destroy();

    const {SubmitStore} = this.props;
    const postImages = SubmitStore.get('postImages');
    if (postImages && postImages.size) {

      PostActions.removeUnusingImage(postImages.toJS());

    } else {
      return true;
    }
  },

  toggleAnnounce() {
    "use strict";

    this.setState({isAnnounce: !this.state.isAnnounce});
  },

  handleContent() {
    "use strict";
    let allContents = this.editor.serialize();
    let el = allContents['post_editor'].value;

    PostActions.handleContent({
      content: el,
      width: this.refs.post_editor.offsetWidth,
      height: this.refs.post_editor.offsetHeight
    });
  },

  submitPost() {
    const {SubmitStore, UserStore, location} = this.props;

    const skills = UserStore.get('skills');
    const writePost = skills
      .filter((skill, index) => skill.getIn(['skill', 'name']) === 'write_post')
      .get(0);

    function checkSkillAvailable(writePostSkill) {
      "use strict";

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
      const title = SubmitStore.get('title');
      const content = SubmitStore.get('content');
      if (title && content) {
        let newPost = {
          title: title,
          content: content,
          prefixId: SubmitStore.get('selectPrefixId'),
          query: location.query,
          isAnnounce: this.state.isAnnounce,
          width: SubmitStore.get('width'),
          height: SubmitStore.get('height'),
          postImages: SubmitStore.get('postImages') || null,
          representingImage: (SubmitStore.get('postImages') && SubmitStore.get('representingImage'))
            ? SubmitStore.get('postImages').get(SubmitStore.get('representingImage'))
            : null
        };
        PostActions.submitPost(newPost);
      }
    } else {
      console.log('not available');
    }
  },

  modPost() {
    "use strict";
    const {SubmitStore, UserStore, location} = this.props;

    const title = SubmitStore.get('title');
    const content = SubmitStore.get('content');

    if (title && content) {
      let newPost = {
        postId: SubmitStore.get('postId'),
        title: title,
        content: content,
        prefixId: SubmitStore.get('selectPrefixId'),
        query: location.query,
        isAnnounce: this.state.isAnnounce,
        width: SubmitStore.get('width'),
        height: SubmitStore.get('height')
      };
      PostActions.modPost(newPost);
    }
  },


  removeContnet() {
    "use strict";
    PostActions.removeContent();
    this.editor.setContent(null);
  },

  getUrlPost() {
    "use strict";

    const url = this.refs.url_input.value.trim();
    PostActions.getMeta(url);
  },

  selectEditor() {
    "use strict";

    this.setState({type: 'editor'});
  },

  selectUrl() {
    "use strict";

    this.setState({type: 'url'});
  },

  createUrlMetaContent(urlMetaData, askButton) {
    "use strict";

    return (
      <div className="url-meta-data-box">
        <a href={urlMetaData.get('url')} target="_blank">
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
                  <p>{(urlMetaData.get('siteName') || urlMetaData.getIn(['uri', 'host']))}</p>
                </div>
                <div className="description">
                  <p>{urlMetaData.get('description')}</p>
                </div>
                {
                  askButton &&
                  <div className="extra">
                    <div className="ui right floated button" onClick={this.setUrlMetaContent}>
                      링크 사용
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </a>
      </div>)
  },

  setUrlMetaContent(e) {
    "use strict";
    e.preventDefault();
    e.stopPropagation();

    const urlMetaData = this.props.SubmitStore.get('urlMetaData');
    const box = this.createUrlMetaContent(urlMetaData, false);

    PostActions.handleContent({content: ReactDOM.renderToStaticMarkup(box)});
  },

  checkTitleAndContent() {
    "use strict";

    const {SubmitStore} = this.props;
    return !SubmitStore.get('title') || !$(SubmitStore.get('content')).text().trim();
  },

  handleRecaptcha(a,b,c,d) {
    "use strict";

    const args = Array.prototype.slice.call(arguments, 1);

    console.log(args, a, b, c, d)
  },

  checkForumManager(user, managers) {
    "use strict";

    const key = managers.findKey(u => u.get('id') === user.get('id'));
    if (key === undefined) {
      return false;
    } else {
      return user;
    }
  },

  createThumbnailImages(image, index)  {
    const isRepresent = this.props.SubmitStore.get('representingImage') === index;
    const style = cx('image_item select_represent', {
      select_represent: isRepresent
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
        <img src={image.thumbnailUrl} />
      </li>
    )
  },

  setRepresentImage(index) {
    "use strict";

    PostActions.setRepresentImage({index: index});
  },

  render() {
    "use strict";

    const {SubmitStore, UserStore, AuthStore} = this.props;
    const type = SubmitStore.get('type');
    const urlMetaData = SubmitStore.get('urlMetaData');
    const announces = SubmitStore.getIn(['forum', 'announces']);
    const announcesLength = (announces && announces.size)
      ? announces.size
      : 0;
    const managers = SubmitStore.getIn(['forum', 'managers']);

    const isManager = this.checkForumManager(UserStore.get('user'), managers);

    const displayEditor = cx('ui description submit_post_box', {
      hide: this.state.type !== 'editor'
    });
    const displayUrl = cx('', {
      hide: this.state.type !== 'url'
    });
    const editorActive = cx('item', {
      active: this.state.type === 'editor'
    });
    const urlActive = cx('item', {
      active: this.state.type === 'url'
    });
    const titleAndContentActiveButton = cx('ui primary button', {
      disabled: this.checkTitleAndContent()
    });

    let urlMetaDataBox;
    if (urlMetaData && urlMetaData.size) {
      urlMetaDataBox = this.createUrlMetaContent(urlMetaData, true);
    }

    return (
      <div className="editor-box">

        <div className="ui labeled icon menu editor-type-menu">
          <a className={editorActive} onClick={this.selectEditor}>
            <i className="pencil icon"></i>
            에디터
          </a>
          <a className={urlActive} onClick={this.selectUrl}>
            <i className="fa fa-link icon"></i>
            URL
          </a>
        </div>

        <div className={displayEditor}>
          <div id="post_editor_background">
            <div ref="post_editor" className="post_editor" id="post_editor" placeholder="텍스트를 입력하세요"></div>
          </div>

          {
            SubmitStore.get('postImages') && SubmitStore.get('postImages').size > 0 &&
            <div className="submit_images">
              <div className="header">
                <h4>대표 이미지</h4>
                <p>대표 이미지를 설정해주세요</p>
              </div>
              <ul className="image_list">
                {
                  SubmitStore.get('postImages').map(this.createThumbnailImages)
                }
              </ul>
            </div>
          }
        </div>

        <div className={displayUrl}>
          <div className="ui action input">
            <input ref="url_input" type="text" placeholder="주소를 입력하세요"/>
            <button className="ui button" onClick={this.getUrlPost}>확인</button>
          </div>

          { urlMetaDataBox }

        </div>

        {/* <TagList items={Tags} /> */}

        {
          (announcesLength < 5) && (isManager) &&
          <div className="ui checkbox">
            <input id="is_announce" type="checkbox" onChange={this.toggleAnnounce}/>
              <label htmlFor="announce_check">공지 글 ({`${announcesLength} / 5`})</label>
          </div>
        }

        <div className="submit_button_box">
          {
            (type === 'write') &&
            <button className={titleAndContentActiveButton} onClick={this.submitPost}>
              저장하기
            </button>
          }
          {
            (type === 'mod') &&
            <button className={titleAndContentActiveButton} onClick={this.modPost}>
              수정하기
            </button>
          }
          <button className="ui button" onClick={this.removeContent}>
            다시 쓰기
          </button>
        </div>

      </div>
    )
  }
});


require('./index.scss');
const SubmitContents = React.createClass({
  displayName: 'SubmitContents',
  propTypes: {},

  handleTitle() {
    "use strict";
    PostActions.handleTitle(this.refs.title.value);
  },
  handlePrefix(option) {
    "use strict";
    if (option) {
      PostActions.selectPrefix(option.value);
    } else if (option === null) {
      PostActions.selectPrefix(null);
    }
  },

  setContent(content) {
    "use strict";

  },

  render() {
    const {AuthStore, UserStore, SubmitStore} = this.props;

    const isLogin = AuthStore.get('isLogin');

    const forumInfo = this.props.SubmitStore.get('forum');

    if (isLogin) {
      const prefixesData = SubmitStore.get('prefixes');
      const user = UserStore.get('user');
      const profile = UserStore.get('profile');
      const icon = UserStore.get('icon');
      const sex = profile.get('sex'),
        avatar_img = profile.get('avatar_img'),
        icon_img = icon ? icon.get('img') : null;

      let avatarImg, iconImg, options;

      if (icon_img) {
        iconImg = <img id="user_icon_img" src={'/images/' + icon_img}/>;
      }

      let prefixes = [];
      if (prefixesData) {
        prefixes = prefixesData.toJS();
        options = prefixes.map(function (item) {
          return mapKeys(item, function (value, key) {
            return key === 'id' ? 'value' : (key === 'name' ? 'label' : key)
          })
        });
      }

      if (!forumInfo) {
        return (
          <SelectSearchForum
            profile={profile}
          />
        )
      }

      return (
        <div id="submit_box" className="ui items">
          <div className={"ui item post_item"}>
            {/* avatar */}
            <div className="ui image tiny">
              <AvatarImage
                sex={sex}
                avatarImg={avatar_img}
              />
            </div>

            {/* meta */}
            <div className="ui content">
              <div className="post_header">
                {
                  prefixes &&
                  <Select
                    name="select_prefix"
                    value={SubmitStore.get('selectPrefixId')}
                    placeholder="말머리 선택"
                    noResultsText="말머리가 없습니다"
                    options={options}
                    onChange={this.handlePrefix}
                  />
                }
                <div className="ui input">
                  <input ref="title"
                         id="post_submit_title"
                         type="text"
                         placeholder="제목을 입력하세요"
                         value={SubmitStore.get('title')}
                         onChange={this.handleTitle}/>
                </div>
              </div>

              <div className="meta best_post_meta">
                <div className="ui horizontal divided list">
                  <div className="item">
                    {forumInfo.get('title')}
                  </div>
                </div>
              </div>
              <div className="meta best_post_meta">
                <div className="author_nick">
                  {user.get('nick')}
                </div>
                <div className="author_icon">
                  {iconImg}
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
        <div>
          안녕하세요 베나클 입니다.
          로그인을 해주세요
        </div>
      )
    }
  }

});

export default SubmitContents;
