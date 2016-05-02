/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import {medium, mediumInsertConfig} from './config';

require('./index.scss');
const SubmitContents = React.createClass({
  displayName: 'SubmitContents',
  propTypes: {},

  componentDidMount() {
    this.editor = new MediumEditor('#post_editor', medium);
    $('#post_editor').mediumInsert(mediumInsertConfig(this.editor));
  },

  render() {
    const { LoginStore, UserStore, SubmitStore } = this.props;
    const user = UserStore.get('user');
    const profile = UserStore.get('profile');
    const icon = UserStore.get('icon');
    const sex = profile.get('sex'),
      avatar_img = profile.get('avatar_img'),
      icon_img = icon.get('img');
    let avatarImg, iconImg;

    if (avatar_img) {
      avatarImg = <img src={'/images/files/' + avatar_img + '.png'} />;
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

    return (
      <div id="submit_box" className="ui items">
        <div className={"ui item post_item"}>
          {/* avatar */}
          <div className="ui image tiny">
            { avatarImg }
          </div>

          {/* meta */}
          <div className="ui content">
            제목 
            <input id="post_submit_title" className="post_submit_title" />
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
              <div className="post_editor" id="post_editor"></div>
            </div>

            {/* <TagList items={Tags} /> */}

          </div>
        </div>
      </div>
    );
  }
});

export default SubmitContents;
