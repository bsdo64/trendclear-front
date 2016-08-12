import React from 'react';
import {Link} from 'react-router';
import cx from 'classnames';

import CollectionActions from '../../../Actions/CollectionActions';

const collectionData = [{
  id: 1,
  title: '나의 게임',
  subs: [{
    id: 1,
    title: '오버워치'
  }, {
    id: 2,
    title: '롤'
  }, {
    id: 3,
    title: '인벤'
  }, {
    id: 4,
    title: '디스크'
  }, {
    id: 5,
    title: '맥'
  }]
}, {
  id: 2,
  title: '나의 오락',
  subs: [{
    id: 1,
    title: '오버워치'
  }, {
    id: 2,
    title: '롤'
  }, {
    id: 3,
    title: '인벤'
  }, {
    id: 4,
    title: '디스크'
  }, {
    id: 5,
    title: '맥'
  }]
}];

const Subs = React.createClass({
  displayName: 'Subs',
  render() {
    "use strict";
    const {subs} = this.props;
    return (
      <ul className="forum_list">
        {
          subs.map(sub => {
            return (
              <li key={sub.id} className="forum_list_item">
                <a>{sub.title}</a>
                <i className="fa fa-minus un_subscribe"/>
              </li>
            )
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

  openCollection() {
    "use strict";

    clearTimeout(this.closeTimer);
    this.setState({hide: false});
  },

  closeCollection() {
    "use strict";

    this.closeTimer = setTimeout(() => {
      // const isMouseOver = checkMouseOver();

      this.setState({hide: true});
    }, 200);
  },

  render() {
    "use strict";

    const {id, title, subs} = this.props;
    const itemStyle = cx('collection_list', {
      hide: this.state.hide
    });

    return (
      <div key={id} className='sub_category item'
           onMouseOver={this.openCollection}
           onMouseOut={this.closeCollection}
      >
        <Link to={{pathname: '/community'}}>{title}</Link>
        <div className={itemStyle}>
          <h4 className="forum_list_header">이 컬렉션의 구독 </h4>

          <Subs subs={subs}
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
      title: '',
      description: '',
      isPrivate: false
    };
  },

  openCreateCollection() {
    "use strict";

  },
  handleChangeTitle(event) {
    "use strict";

    this.setState({title: event.target.value});
  },
  handleChangeDescription(event) {
    "use strict";

    this.setState({description: event.target.value});
  },
  handleChangePrivate(event) {
    "use strict";

    this.setState({isPrivate: !this.state.isPrivate});
  },
  submitNewCollection(e) {
    "use strict";
    e.preventDefault();
    e.stopPropagation();

    const {title, description} = this.state;
    if (title && description) {
      CollectionActions.createCollection(...this.state);
    }
  },
  render() {
    "use strict";

    return (
      <li id="user_best_collection">
        <h5 className="">
          <a>{'콜랙션'}</a>
        </h5>

        {
          collectionData.map((collection => {
            return (
              <CollectionItem
                key={collection.id}
                title={collection.title}
                subs={collection.subs}
              />
            )
          }))
        }

        <div className="sub_category item create_collection">
          <a className="create_collection_btn" onClick={this.openCreateCollection}>{'새로운 콜랙션 추가 +'}</a>
          <div className="create_box">
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
              <button className="ui primary button tiny" type="submit">만들기</button>
            </form>

          </div>
        </div>
      </li>
    )
  }
});

export default Collection;