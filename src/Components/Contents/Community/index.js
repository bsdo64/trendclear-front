/**
 * Created by dobyeongsu on 2016. 3. 25..
 */
/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import CommunityActions from '../../../Actions/CommunityActions';

import Forum from './Forum';
import PostPage from './Post';

const CommunityContents = React.createClass({
  displayName: 'CommunityContents',
  // mixins: [PureRenderMixin],

  componentWillUnmount() {
    CommunityActions.resetData();
  },

  render() {
    "use strict";
    const type = this.props.CommunityStore.get('type');

    if (type === 'forum') {
      return (
        <Forum
          {...this.props}
        />
      )
    } else if (type === 'post') {
      return (
        <PostPage
          {...this.props}
        />
      )

    } else {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui large text loader">로딩중..</div>
        </div>
      )
    }
  }
});

export default CommunityContents;