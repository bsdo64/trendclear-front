/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import {Link} from 'react-router';
import BestContainer from '../../../Container/Contents/Best';

require('./index.scss');
const SettingBox = React.createClass({
  displayName: 'SettingBox',
  propTypes: {},
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    $('.ui.radio.checkbox')
      .checkbox()
    ;

    $('select.dropdown')
      .dropdown()
    ;
  },


  getInitialState() {
    return {
      term: false, privacy: false, agree: false
    };
  },
  submitAgreement() {
    const {term, privacy} = this.state;

    if (term && privacy) {
      this.setState({agree: true});
    }
  },
  handleCheckTerms() {
    this.setState({term: !this.state.term});
  },
  handleCheckPrivacy() {
    this.setState({privacy: !this.state.privacy});
  },

  createActivityUserHeader(UserStore) {
    "use strict";

    const user = UserStore.get('user');
    const sex = UserStore.getIn(['profile', 'sex']),
          avatar_img = UserStore.getIn(['profile', 'avatar_img']);

    return (
      <h2 className="ui center aligned icon header">
        {this.createAvatarImg(sex, avatar_img)}
        <div className="nick">{user.get('nick')}</div>
      </h2>
    )
  },
  createAvatarImg(sex, avatarImg) {
    
    if (avatarImg) {
      return <img className="circular users icon" src={'/image/uploaded/files/' + avatarImg} />;
    } else {
      if (sex) {
        return <img className="circular users icon" src="/images/default-male.png" />;
      } else {
        return <img className="circular users icon" src="/images/default-female.png" />;
      }
    }
  },
  render() {
    const {UserStore} = this.props;

    return (
      <div id="activity">
        <div className="activity-header">
          <div className="activity-background">

            {this.createActivityUserHeader(UserStore)}

            <div className="activity-meta">
              <div className="ui horizontal list">
                <div className="item">
                  <div className="middle aligned content">
                    글 1,042
                  </div>
                </div>
                <div className="item">
                  <div className="middle aligned content">
                    좋아요 1,243
                  </div>
                </div>
                <div className="item">
                  <div className="middle aligned content">
                    댓글 204
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ui menu activity-menu">
            <Link to="/activity/likes" className="item">
              좋아요
            </Link>
            <Link to="/activity/posts" className="item">
              글
            </Link>
            <Link to="/activity/comments" className="item active">
              댓글
            </Link>
          </div>
        </div>

        <BestContainer />
      </div>
    );
  }
});

export default SettingBox;
