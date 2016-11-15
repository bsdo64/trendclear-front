import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import CollectionActions from '../../Actions/CollectionActions';

require('./index.scss');
const SubscribeForumList = React.createClass({
  displayName: 'SubscribeForumList',
  getInitialState() {
    return {
      hideCreateCollectionBox: true,
      searchForumTitle: null
    };
  },

  toggleCreateCollection() {
    "use strict";

    this.setState({ hideCreateCollectionBox: !this.state.hideCreateCollectionBox })
  },
  searchForum(e) {
    "use strict";
    e.preventDefault();
    e.stopPropagation();

    if (this.state.searchForumTitle) {
      CollectionActions.findForumByTitle({
        title: this.state.searchForumTitle
      });
    }
  },
  handleChangeName(e) {
    "use strict";

    this.setState({ searchForumTitle: e.target.value.trim() })
  },
  toggleForumCandidate(forumId, e) {
    "use strict";

    let newForumCandidate = this.props.subscribeForumList;
    if (newForumCandidate.includes(forumId)) {

      const findIndex = newForumCandidate.findIndex(element => element === forumId);
      newForumCandidate.splice(findIndex, 1);

      CollectionActions.removeForum({
        forumId: forumId,
        collectionId: this.props.collection.get('id')
      })

    } else {

      newForumCandidate.push(forumId);
      CollectionActions.addForum({
        forumId: forumId,
        collectionId: this.props.collection.get('id')
      })
    }
  },
  createListItem(forumId) {
    const { forums } = this.props;
    const forum = forums.get(forumId.toString());
    return (
      <div key={forumId} className="item">
        <div className="left floated content add_subscribe_button">
          {
            this.props.subscribeForumList.includes(forumId) &&
            <div className="ui icon button blue" onClick={this.toggleForumCandidate.bind(this, forumId)}>
              <i className="checkmark icon"/>선택됨
            </div>
          }

          {
            !this.props.subscribeForumList.includes(forumId) &&
            <div className="ui button" onClick={this.toggleForumCandidate.bind(this, forumId)}>선택</div>
          }
        </div>
        <Link to={`/community?forumId=${forumId}`} className="header">{forum.get('title')}</Link>
        <div className="description">
          {forum.get('description')}
        </div>
      </div>
    );
  },

  render() {
    "use strict";

    const { collection, forums, searchForumList } = this.props;
    const createCollectionBoxStyle = cx('create_box', {
      hide: this.state.hideCreateCollectionBox
    });

    return (
      <li id="collection_forum_list">
        <h5 className="">
          <a>
            <i className="fa fa-list"/>{' 구독 게시판'}
          </a>
        </h5>

        {
          collection &&
          collection.get('forums').map(forumId => {
            const forum = forums.get(forumId.toString());
            return (
              <div key={forumId} className="sub_category item create_collection_subscribe">
                <Link to={`/community?forumId=${forumId}`}
                      className="create_collection_btn">{forum.get('title')}</Link>
              </div>
            )
          })
        }

        <div className="sub_category item create_collection_subscribe">
          <a className="create_collection_btn" onClick={this.toggleCreateCollection}>{'새로운 구독 + '}</a>
          <div className={createCollectionBoxStyle}>
            <form className="ui mini form " onSubmit={this.searchForum}>
              <div className="field collection_title_field">
                <label>게시판 이름</label>
                <input type="text" name="forum_name"
                       placeholder="게시판 이름" onChange={this.handleChangeName}/>
              </div>

              <h5>추천 리스트</h5>
              <div className="ui list search_subscribe_list">
                {
                  searchForumList && (searchForumList.size > 0) &&
                  searchForumList.map(this.createListItem)
                }
              </div>
            </form>
          </div>
        </div>
      </li>
    )
  }
});

export default SubscribeForumList;