/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import {Link} from 'react-router';

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
  render() {
    const {agree} = this.state;
    return (
      <div id="setting">

        <div id="activity">
          <div className="activity-background">

            <h2 className="ui center aligned icon header">
              <img className="circular users icon" src="/image/uploaded/files/footer_facebook.gif" />
              <div className="nick">Hello</div>
            </h2>

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
      </div>
    );
  }
});

export default SettingBox;
