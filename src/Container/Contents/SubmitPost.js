import React from 'react';
import alt from '../../Utils/alt';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';
import SubmitStore from '../../Stores/SubmitStore';

import AuthStore from '../../Stores/UI/AuthStore';

import Submit from '../../Components/Contents/Submit';

const SigninContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [SubmitStore, LoginStore, UserStore, AuthStore];
  },

  getPropsFromStores() {
    return {
      SubmitStore: SubmitStore.getState(),
      AuthStore: AuthStore.getState(),
      UserStore: UserStore.getState(),
      LoginStore: LoginStore.getState()
    }
  }
}, React.createClass({
  render() {
    const forumInfo = this.props.SubmitStore.get('forum');
    const clubs = alt.getStore('Clubs').getState();
    const CategoryGroups = alt.getStore('CategoryGroups').getState();
    const Category = alt.getStore('Categories').getState();


    if (clubs && Category && CategoryGroups && forumInfo) {
      const club = clubs.get(forumInfo.get('club_id').toString());
      const category = Category.get(forumInfo.get('category_id').toString());
      const categoryGroup = CategoryGroups.get(forumInfo.get('club_category_group_id').toString());

      if (club && categoryGroup && category) {
        return (<Submit {...this.props} club={club} categoryGroup={categoryGroup} category={category} />)
      }
    }

    return (<div></div>);
  }
}));

module.exports = SigninContainer;
