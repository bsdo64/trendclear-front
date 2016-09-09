import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';
import RemoveModalStore from '../../Stores/UI/RemoveModalStore';
import Posts from '../../Stores/Domain/Posts';
import Comments from '../../Stores/Domain/Comments';
import SubComments from '../../Stores/Domain/SubComments';

import DeleteModalBox from '../../Components/DeleteModalBox';

const ReportModalContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [Posts, Comments, SubComments, LoginStore, UserStore, RemoveModalStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      UserStore: UserStore.getState(),
      RemoveModalStore: RemoveModalStore.getState(),
      Posts: Posts.getState(),
      Comments: Comments.getState(),
      SubComments: SubComments.getState(),
    }
  }
}, React.createClass({
  render() {
    return (<DeleteModalBox {...this.props} />)
  }
}));


module.exports = ReportModalContainer;
