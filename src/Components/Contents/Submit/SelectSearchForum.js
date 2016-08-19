import React from 'react';
import {browserHistory} from 'react-router';

const SelectSearchForum = React.createClass({
  componentDidMount() {
    const self = this;

    $('.ui.search_forums')
      .search({
        searchFullText: false,
        apiSettings: {
          url: '/ajax/search/forum?q={query}'
        },
        onSelect: function (forum) {
          "use strict";

          self.selectForum(forum);
        }
      });
  },

  selectForum(forum) {
    "use strict";

    if (forum && forum.id) {
      browserHistory.push('/community/submit?forumId=' + forum.id)
    }
  },

  render() {
    const {avatarImg} = this.props;

    return (
      <div id="submit_box" className="ui items">
        <div className={"ui item post_item"}>
          {/* avatar */}
          <div className="ui image tiny">
            { avatarImg }
          </div>

          {/* meta */}
          <div className="ui content">
            <div className="search_box">
              <h3 className="ui header">
                게시판 선택
                <div className="sub header">게시판을 먼저 선택해주세요</div>
              </h3>

              <div className="ui search search_forums">
                <div className="ui icon input">
                  <input className="prompt" type="text" placeholder="Search animals..." />
                  <i className="search icon"></i>
                </div>
                <div className="results"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
});

export default SelectSearchForum;
