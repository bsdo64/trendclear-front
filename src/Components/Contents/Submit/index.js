/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import Select from 'react-select';
import _ from 'lodash';

import {medium, mediumInsertConfig} from './config';
import PostActions from '../../../Actions/PostActions';

require('./index.scss');
const SubmitContents = React.createClass({
  displayName: 'SubmitContents',
  propTypes: {},

  componentDidMount() {
    let that = this;
    this.editor = new MediumEditor('#post_editor', medium);
    this.editor.subscribe('editableInput', function (event, editable) {
      "use strict";
      that.handleContent()
    });
    $('#post_editor').mediumInsert(mediumInsertConfig(this.editor));

    // init content
    const initContent = this.props.SubmitStore.get('content');
    if (initContent) {
      this.editor.setContent(initContent);
    }
  },
  
  submitPost() {
    const { SubmitStore } = this.props;
    let newPost = {
      title: SubmitStore.get('title'),
      content: SubmitStore.get('content'),
      prefixId: SubmitStore.get('selectPrefixId'),
      query: this.props.location.query
    };
    PostActions.submitPost(newPost);
  },

  handleTitle() {
    "use strict";
    PostActions.handleTitle(this.refs.title.value);
  },
  handleContent() {
    "use strict";
    let allContents = this.editor.serialize();
    let el = allContents['post_editor'].value;
    PostActions.handleContent(el);
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

  removeContnet() {
    "use strict";
    PostActions.removeContent();
    this.editor.setContent(null);
  },

  render() {
    const { LoginStore, UserStore, SubmitStore } = this.props;
    const prefixesData = SubmitStore.get('prefixes');
    const user = UserStore.get('user');
    const profile = UserStore.get('profile');
    const icon = UserStore.get('icon');
    const sex = profile.get('sex'),
      avatar_img = profile.get('avatar_img'),
      icon_img = icon ? icon.get('img'): null;
    let avatarImg, iconImg;

    if (avatar_img) {
      avatarImg = <img src={'/image/uploaded/files/' + avatar_img} />;
    } else {
      if (sex) {
        avatarImg = <img src="/images/default-male.png" />;
      } else {
        avatarImg = <img src="/images/default-female.png" />;
      }
    }

    if (icon_img) {
      iconImg = <img id="user_icon_img" src={'/images/' + icon_img}/>;
    }

    let prefixes = [];
    if (prefixesData) {
      prefixes = prefixesData.toJS();
    }
    let options = prefixes.map(function (item) {
      return _.mapKeys(item, function (value, key) {
        return key==='id' ? 'value' : (key==='name' ? 'label' : key)
      })
    });
    return (
      <div id="submit_box" className="ui items">
        <div className={"ui item post_item"}>
          {/* avatar */}
          <div className="ui image tiny">
            { avatarImg }
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
                       onChange={this.handleTitle} />
              </div>
            </div>

            <div className="meta best_post_meta">
              <div className="ui horizontal divided list">
                <div className="item">
                  Hello
                </div>
                <div className="item">
                  World
                </div>
                <div className="item">
                  2
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

            {/* content */}
            <div className="ui description submit_post_box" >
              <div className="post_editor" id="post_editor" ></div>
            </div>

            {/* <TagList items={Tags} /> */}

            <div className="submit_button_box">
              <button className="ui primary button" onClick={this.submitPost}>
                저장하기
              </button>
              <button className="ui button" onClick={this.removeContnet}>
                다시 쓰기
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
});

export default SubmitContents;
