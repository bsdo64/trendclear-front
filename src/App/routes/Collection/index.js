import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  render() {
    const { collectionList } = this.props;

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
                    <i className="fa fa-folder-open" style={{paddingRight: 5}}/>
                    {v.get('title')}
                  </div>
                )
              })
            }

            <div className={s.myCollectionListItem + s.createCollectionItem} style={{padding: 10}}>
              <i className="fa fa-plus" style={{paddingRight: 5}}/>
              컬렉션 만들기
            </div>
          </div>
        </div>

      </div>
    );
  }
}

CollectionIndex.propTypes = {
  collectionList: PropTypes.object.isRequired,
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
  {}
)(CollectionIndex);
