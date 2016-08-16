import React from 'react';
import {Link} from 'react-router';
import cx from 'classnames';

import CollectionActions from '../../../Actions/CollectionActions';

const Subs = React.createClass({
  displayName: 'Subs',

  render() {
    "use strict";
    const {subs, forums} = this.props;
    return (
      <ul className="forum_list">
        {
          subs &&
          subs.map(subId => {
            const forum = forums.get(subId.toString());
            if (forum) {
              return (
                <li key={forum.get('id')} className="forum_list_item">
                  <a>{forum.get('title')}</a>
                  <i className="fa fa-minus un_subscribe"/>
                </li>
              )
            } else {
              return <li></li>
            }
          })
        }
      </ul>
    )
  }
});

const CollectionItem = React.createClass({
  displayName: 'CollectionItem',
  getInitialState() {
    return {
      hide: true
    };
  },

  openCollection(itemId) {
    "use strict";

    this.props.mouseOverItemHandler(itemId)
  },

  closeCollection() {
    "use strict";

    this.props.closeItemHandler();
  },

  render() {
    "use strict";

    const {
      id, title, subs, forums,
      mouseOverItem,
    } = this.props;
    const itemStyle = cx('collection_list', {
      hide: (mouseOverItem !== id)
    });

    return (
      <div key={id} className='sub_category item'
           onMouseOver={this.openCollection.bind(this, id)}
           onMouseOut={this.closeCollection.bind(this, id)}
      >
        <Link to={{pathname: '/community'}}>{title}</Link>
        <div className={itemStyle}>
          <h4 className="forum_list_header">이 컬렉션의 구독 </h4>

          <Subs subs={subs}
                forums={forums}
                onMouseOver={this.openCollection}
                onMouseOut={this.closeCollection}
          />

        </div>
      </div>
    )
  }
});

const Collection = React.createClass({
  displayName: 'Collection',
  getInitialState() {
    return {
      createCollection: {
        title: '',
        description: '',
        isPrivate: false
      },
      hideCreateCollectionBox: true,
      mouseOverItemId: null
    };
  },
  closeItemHandler() {
    "use strict";

    this.setState({mouseOverItemId: null});
  },
  mouseOverItemHandler(itemId) {
    "use strict";

    this.setState({mouseOverItemId: itemId});
  },
  toggleCreateCollection() {
    "use strict";

    this.setState({hideCreateCollectionBox: !this.state.hideCreateCollectionBox})
  },
  closeCreateCollection() {
    "use strict";

    this.setState({hideCreateCollectionBox: true})
  },
  handleChangeTitle(event) {
    "use strict";

    const newState = this.state;
    newState.createCollection.title = event.target.value;
    this.setState(newState);
  },
  handleChangeDescription(event) {
    "use strict";

    const newState = this.state;
    newState.createCollection.description = event.target.value;
    this.setState(newState);
  },
  handleChangePrivate(event) {
    "use strict";

    const newState = this.state;
    newState.createCollection.isPrivate = !newState.createCollection.isPrivate;
    this.setState(newState);
  },
  submitNewCollection(e) {
    "use strict";
    e.preventDefault();
    e.stopPropagation();

    const {title, description} = this.state.createCollection;
    if (title && description) {
      CollectionActions.createCollection(this.state.createCollection);
      this.closeCreateCollection();
    }
  },
  render() {
    "use strict";

    const {collections, forums} = this.props;
    const self = this;
    const createCollectionBoxStyle = cx('create_box', {
      hide: this.state.hideCreateCollectionBox
    });

    return (
      <li id="user_best_collection">
        <h5 className="">
          <a>{'컬랙션'}</a>
        </h5>

        {
          collections &&
          collections.map((collection => {
            return (
              <CollectionItem
                key={collection.get('id')}
                id={collection.get('id')}
                title={collection.get('title')}
                subs={collection.get('forums')}
                forums={forums}
                mouseOverItemHandler={self.mouseOverItemHandler}
                closeItemHandler={self.closeItemHandler}
                mouseOverItem={this.state.mouseOverItemId}
              />
            )
          }))
        }

        <div className="sub_category item create_collection">
          <a className="create_collection_btn" onClick={this.toggleCreateCollection}>{'컬랙션 추가 +'}</a>
          <div className={createCollectionBoxStyle}>
            <form className="ui mini form " onSubmit={this.submitNewCollection}>
              <div className="field collection_title_field">
                <label>이름</label>
                <input type="text" name="title"
                       placeholder="컬렉션 이름" onChange={this.handleChangeTitle}/>
              </div>
              <div className="field collection_description_field">
                <label>설명</label>
                <input type="text" name="description"
                       placeholder="컬렉션 설명" onChange={this.handleChangeDescription}/>
              </div>
              <div className="field collection_checkbox_field">
                <label>
                  <input name="isPrivate" type="checkbox"
                         defaultChecked={false} value={this.state.isPrivate}
                         onChange={this.handleChangePrivate}
                  /> 비공개
                </label>
              </div>
              <button className="ui primary button tiny" type="submit" >만들기</button>
            </form>

          </div>
        </div>
      </li>
    )
  }
});

export default Collection;