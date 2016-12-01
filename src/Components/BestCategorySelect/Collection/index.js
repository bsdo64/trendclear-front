import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

const Subs = (props) => {
  const { subs, Forums, activeId } = props;
  return (
    <ul className="forum_list">
      {
        subs &&
        subs.map(subId => {
          const forum = Forums.get(subId.toString());
          if (forum) {
            return (
              <li key={forum.get('id')} className="forum_list_item">
                <i className="fa fa-file-o"/>
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
  Forums: PropTypes.object.isRequired,
  activeId: PropTypes.string.isRequired,
};

const CollectionItem = React.createClass({
  displayName: 'CollectionItem',
  propTypes: {
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    subs: PropTypes.object,
    Forums: PropTypes.object.isRequired,
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
      id, title, subs, Forums,
      mouseOverItem,
      location
    } = this.props;
    const itemStyle = cx('collection_list', {
      hide: (mouseOverItem !== id)
    });
    const collectionNowId = location ? location.pathname.split('/')[2] : null;
    const isCollectionOpenStyle = cx('fa', {
      'fa-folder-open-o': collectionNowId === id,
      'fa-folder-o': collectionNowId !== id
    });

    return (
      <div key={id} className='sub_category item collection_item'>
        {
          (collectionNowId === id) &&
          <div className="active-menu"></div>
        }

        <div className="collection">
          <Link to={{ pathname: `/collection/${id}` }}>

            <i className={isCollectionOpenStyle} style={{ paddingRight: 3 }} />
            <span className="title">{title}</span>

          </Link>
        </div>

        <div className={itemStyle}>
          <Subs subs={subs}
                Forums={Forums}
                activeId={id}
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
    Forums: PropTypes.object.isRequired,
    location: PropTypes.object,
    Collections: PropTypes.object.isRequired,
    FireRequestCreateCollection: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      createCollection: {
        title: '',
        description: '',
        isPrivate: false
      },
      hideCreateCollectionBox: true,
      mouseOverItemId: location.pathname.split('/')[2]
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
      this.props.FireRequestCreateCollection(this.state.createCollection);
      this.closeCreateCollection();
    }
  },
  createCollectionItem(collections) {
    const { Forums, location } = this.props;
    const self = this;
    return collections.entrySeq().map(([key, map]) => {
      return (
        <CollectionItem
          key={key}
          id={key}
          title={map.get('title')}
          subs={map.get('forums')}
          Forums={Forums}
          location={location}
          mouseOverItemHandler={self.mouseOverItemHandler}
          closeItemHandler={self.closeItemHandler}
          mouseOverItem={self.state.mouseOverItemId}
        />
      )
    })
  },

  render() {

    const { Collections } = this.props;
    const createCollectionBoxStyle = cx('create_box', {
      hide: this.state.hideCreateCollectionBox
    });

    return (
      <li id="user_best_collection">
        <h5 className="">
          <a><i className="fa fa-folder-open"/>{' 내 컬랙션'}</a>
        </h5>

        {
          Collections &&
          this.createCollectionItem(Collections)
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