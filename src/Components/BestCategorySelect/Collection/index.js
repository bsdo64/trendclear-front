import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import CollectionActions from '../../../Actions/CollectionActions';

const Subs = (props) => {
  const { subs, forums } = props;
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
            return <li />
          }
        })
      }
    </ul>
  )
};

Subs.propTypes = {
  subs: PropTypes.object,
  forums: PropTypes.object.isRequired,
};

const CollectionItem = React.createClass({
  displayName: 'CollectionItem',
  propTypes: {
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    subs: PropTypes.object,
    forums: PropTypes.object.isRequired,
    mouseOverItem: PropTypes.string,
    location: PropTypes.object,

    closeItemHandler: PropTypes.func.isRequired,
    mouseOverItemHandler: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      hide: true
    };
  },

  openCollection(itemId) {

    this.props.mouseOverItemHandler(itemId)
  },

  closeCollection() {

    this.props.closeItemHandler();
  },

  render() {

    const {
      id, title, subs, forums,
      mouseOverItem,
      location
    } = this.props;
    const itemStyle = cx('collection_list', {
      hide: (mouseOverItem !== id)
    });
    const collectionNowId = location ? location.pathname.split('/')[2] : null;

    return (
      <div key={id} className='sub_category item'
           onMouseOver={this.openCollection.bind(this, id)}
           onMouseOut={this.closeCollection.bind(this, id)}
      >
        {
          (collectionNowId === id) &&
          <div className="active-menu"></div>
        }

        <Link to={{ pathname: `/collection/${id}` }}>

          <span className="title">{title}</span>

        </Link>

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

require('./index.scss');
const Collection = React.createClass({
  displayName: 'Collection',
  propTypes: {
    forums: PropTypes.object.isRequired,
    location: PropTypes.object,
    collections: PropTypes.object.isRequired,
  },

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

    this.setState({ mouseOverItemId: null });
  },
  mouseOverItemHandler(itemId) {

    this.setState({ mouseOverItemId: itemId });
  },
  toggleCreateCollection() {

    this.setState({ hideCreateCollectionBox: !this.state.hideCreateCollectionBox })
  },
  closeCreateCollection() {

    this.setState({ hideCreateCollectionBox: true })
  },
  handleChangeTitle(e) {
    e.preventDefault();
    e.stopPropagation();

    const newState = this.state;
    newState.createCollection.title = e.target.value;
    this.setState(newState);
  },
  handleChangeDescription(e) {
    e.preventDefault();
    e.stopPropagation();

    const newState = this.state;
    newState.createCollection.description = e.target.value;
    this.setState(newState);
  },
  handleChangePrivate(e) {
    e.preventDefault();
    e.stopPropagation();

    const newState = this.state;
    newState.createCollection.isPrivate = !newState.createCollection.isPrivate;
    this.setState(newState);
  },
  submitNewCollection(e) {
    e.preventDefault();
    e.stopPropagation();

    const { title, description } = this.state.createCollection;
    if (title && description) {
      CollectionActions.createCollection(this.state.createCollection);
      this.closeCreateCollection();
    }
  },
  createCollectionItem(collections) {
    const { forums, location } = this.props;
    const self = this;
    return collections.entrySeq().map(([key, map]) => {
      return (
        <CollectionItem
          key={key}
          id={key}
          title={map.get('title')}
          subs={map.get('forums')}
          forums={forums}
          location={location}
          mouseOverItemHandler={self.mouseOverItemHandler}
          closeItemHandler={self.closeItemHandler}
          mouseOverItem={self.state.mouseOverItemId}
        />
      )
    })
  },

  render() {

    const { collections } = this.props;
    const createCollectionBoxStyle = cx('create_box', {
      hide: this.state.hideCreateCollectionBox
    });

    return (
      <li id="user_best_collection">
        <h5 className="">
          <a><i className="fa fa-folder-open"/>{' 내 컬랙션'}</a>
        </h5>

        {
          collections &&
          this.createCollectionItem(collections)
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
                         defaultChecked={false} value={this.state.createCollection.isPrivate}
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