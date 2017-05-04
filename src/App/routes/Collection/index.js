import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { connect } from 'react-redux';
import {
  requestCreateCollection
} from '../../Actions/Collection';
import { getCollectionList } from '../../Selectors/User.js';

import s from './index.css';
const ListHeader = () => {
  return (
    <div className={s.collectionHeaderBox}>
      <div className={s.collectionHeaderContent}>
        <h3 className={s.header}>
          <i className="fa fa-folder"/>
          컬렉션
        </h3>
        <p>나의 컬렉션 리스트</p>
        <p>원하는 클럽을 컬렉션에서 모아서 볼 수 있습니다</p>
      </div>
    </div>
  );
};


class CollectionIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleCreateCollection: false,
      isPrivate: false,
      title: null,
      description: null,
    };

    this.toggleCreateCollection = this.toggleCreateCollection.bind(this);
    this.handleChangePrivate = this.handleChangePrivate.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.submitNewCollection = this.submitNewCollection.bind(this);
    this.removeCollection = this.removeCollection.bind(this);
  }

  toggleCreateCollection() {
    this.setState({ toggleCreateCollection: !this.state.toggleCreateCollection })
  }

  handleChangePrivate(e) {
    e.stopPropagation();
    this.setState({isPrivate: !this.state.isPrivate});
  }

  handleChangeTitle(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({title: e.target.value.trim()});
  }

  handleChangeDescription(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({description: e.target.value.trim()});
  }

  removeCollection(id, e) {
    e.preventDefault();
    e.stopPropagation();

    console.log('Hello' + id);
  }

  submitNewCollection(e) {
    e.preventDefault();
    e.stopPropagation();

    const { title, description, isPrivate } = this.state;
    if (title && description) {
      this.props.FireRequestCreateCollection({
        title,
        description,
        isPrivate
      });
      this.toggleCreateCollection();
    }
  }

  render() {
    const { collectionList } = this.props;
    const { toggleCreateCollection } = this.state;

    return (
      <div className={s.collectionIndexBox} style={{width: 620}}>
        <ListHeader/>

        <div className={s.myCollectionListBox} style={{ padding: 10, paddingTop: 0 }}>

          <h4 className={s.myCollectionListHeader} style={{fontSize: 12, fontWeight: 'normal', padding: 0}}>나의 컬렉션</h4>
          <div className={s.myCollectionList} style={{ background: '#ffffff' }}>
            {
              collectionList.map((v, i) => {
                return (
                  <div className={s.myCollectionListItem} key={i} style={{padding: 10}}>
                    <i className="fa fa-inbox" style={{paddingRight: 5}}/>
                    <span className={s.titleText}>
                      <Link to={`/collection/${v.get('id')}`}>
                        {v.get('title')}
                      </Link>
                    </span>
                    <span
                      className={s.trashItem}
                      onClick={this.removeCollection.bind(this, v.get('id'))}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                )
              })
            }

            {
              !toggleCreateCollection &&
              <div
                className={cx([s.myCollectionListItem, s.createCollectionItem])}
                style={{padding: 10}}
              >
                <i className="fa fa-plus" style={{paddingRight: 5}}/>
                <span className={s.createCollectionButton} onClick={this.toggleCreateCollection}>컬렉션 만들기</span>
              </div>
            }

            {
              toggleCreateCollection &&
              <div
                className={cx([s.myCollectionListItem, s.createCollectionItem])}
                style={{padding: 10}}
              >
                <i className="fa fa-plus" style={{paddingRight: 5}}/>
                <span className={s.createCollectionButton} onClick={this.toggleCreateCollection}>컬렉션 만들기</span>

                <div className={s.createCollectionBox}>
                  <div className={s.boxItem}>
                    <label htmlFor="collectionInputTitle">제목</label>
                    <input
                      type="text"
                      id="collectionInputTitle"
                      className={s.collectionInputText}
                      placeholder="컬렉션 제목을 입력하세요"
                      onChange={this.handleChangeTitle}
                    />
                  </div>

                  <div className={s.boxItem}>
                    <label htmlFor="collectionInputDescription">내용</label>
                    <input
                      type="text"
                      id="collectionInputDescription"
                      className={s.collectionInputText}
                      placeholder="컬렉션 설명을 입력하세요"
                      onChange={this.handleChangeDescription}
                    />
                  </div>

                  <div className={cx([s.privateBox, s.boxItem])}>
                    <label htmlFor="collectionPrivateCheck">비공개</label>
                    <input
                      type="checkbox"
                      id="collectionPrivateCheck"
                      name="collectionPrivateCheck"
                      defaultChecked={false}
                      value={this.state.isPrivate}
                      onChange={this.handleChangePrivate}
                    />
                  </div>

                  <button
                    className="ui button tiny primary"
                    onClick={this.submitNewCollection}>추가</button>
                </div>
              </div>
            }
          </div>
        </div>

      </div>
    );
  }
}

CollectionIndex.propTypes = {
  collectionList: PropTypes.object.isRequired,
  FireRequestCreateCollection: PropTypes.func.isRequired,
};
CollectionIndex.defaultProps = {};

const mapStateToProps = (state) => {
  const getStoreState = state.get('Stores');

  return {
    collectionList: getCollectionList(getStoreState)
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestCreateCollection: requestCreateCollection
  }
)(CollectionIndex);
