import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import GnbStore from '../../Stores/GnbStore';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';
import SubmitStore from '../../Stores/SubmitStore';

const SubmitForm = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [GnbStore, LoginStore, UserStore];
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      UserStore: UserStore.getState(),
      LoginStore: LoginStore.getState()
    }
  }
}, React.createClass({
  getInitialState() {
    return {
      selectClubId: null,
      selectClub: false,
      confirmClub: false,

      selectCategoryGroupId: null,
      selectCategoryGroup: false,
      newCategoryGroup: false,
      dupCategoryGroup: false,
      confirmCategoryGroup: false,

      selectCategoryId: null,
      selectCategory: false,
      newCategory: false,
      dupCategory: false,
      confirmCategory: false
    };
  },

  componentDidMount() {
    const self = this;

    $('#selectClub.search.dropdown')
      .dropdown({
        onChange: function(value, text, $selectedItem) {
          // custom action
          console.log(value, text, $selectedItem);
          self.setState({selectClubId: value, selectClub: true})
        }
      });

    $('#selectCategory.search.dropdown')
      .dropdown({
        allowAdditions: true
      });
  },

  componentDidUpdate(prevProps, prevState) {
    $('#selectCategoryGroup.search.dropdown')
      .dropdown({
        allowAdditions: true
      });
  },


  log(val) {
    "use strict";

    console.log("Selected: ", val);
  },

  confirmClub() {
    "use strict";

    const isSelect = this.state.selectClub && this.state.selectClubId;
    if (isSelect) {
      this.setState({confirmClub: true});
    }
  },

  render() {
    const { GnbStore } = this.props;
    const menus = GnbStore.get('gnbMenu');
    const nMenu = menus.getIn(['INCat', 'entities']);

    const clubs = nMenu.get('clubs');
    const categoryGroups = nMenu.get('categoryGroups');
    const categories= nMenu.get('categories');
    const forums = nMenu.get('forums');

    return (
    <div className="ui container segments" style={{margin: 10, width: 700}}>


      <div className="ui segment">
        <h3 className="ui header">클럽 선택</h3>
        <div className="ui divider"></div>
        <div className="ui list">
          <a className="item">
            <i className="right triangle icon"></i>
            <div className="content">
              <div className="header">가장 큰 분류</div>
              <div className="description">클럽은 각 커뮤니티를 구분합니다</div>
            </div>
          </a>
          <a className="item">
            <i className="right triangle icon"></i>
            <div className="content">
              <div className="header">클럽은 베나클에서 관리합니다.</div>
              <div className="description">사람들이 생각하는 가장 큰 화제를 모으고 있는 분류로 구분합니다.</div>
            </div>
          </a>
          <a className="item">
            <i className="help icon"></i>
            <div className="content">
              <div className="description">추가하고 싶은 클럽이 있다면 의견을 보내주세요</div>
            </div>
          </a>
        </div>
        <div id="selectClub" className="ui search selection dropdown" style={{marginRight: 10}}>
          <input name="tags" type="hidden" />
          <i className="dropdown icon"></i>
          <div className="default text">클럽 선택..</div>
          <div className="menu">
            {
              clubs.toArray().map(v => <div className="item" data-value={v.get('id')}>{v.get('title')}</div>)
            }
          </div>
        </div>
        <div className="ui button primary" onClick={this.confirmClub}>확인</div>
      </div>

      {
        this.state.confirmClub && this.state.selectClubId &&
        <div className="ui  segment">
          <h3 className="header">카테고리 박스 입력</h3>
          <div className="ui divider"></div>
          <div className="ui list">
            <a className="item">
              <i className="right triangle icon"></i>
              <div className="content">
                <div className="header">기본적인 카테고리</div>
                <div className="description">카테고리 박스를 기준으로 컨텐츠를 구분합니다.</div>
              </div>
            </a>
          </div>
          <div id="selectCategoryGroup" className="ui search selection dropdown" style={{marginRight: 10}}>
            <input name="tags" type="hidden" />
            <i className="dropdown icon"></i>
            <div className="default text">카테고리 그룹 선택</div>
            <div className="menu">
              {
                clubs.getIn([this.state.selectClubId, 'category_groups']).map(id =>
                  <div className="item" data-value={categoryGroups.get(id.toString()).get('id')}>{categoryGroups.get(id.toString()).get('title')}</div>)
              }
            </div>
          </div>
          <div className="ui button primary" >확인</div>
        </div>
      }


      <div className="ui segment">
        <h3 className="header">포럼 그룹 입력</h3>
        <div className="ui divider"></div>
        <div className="ui list">
          <a className="item">
            <i className="right triangle icon"></i>
            <div className="content">
              <div className="header">게시판 모음</div>
              <div className="description">하위 게시판들을 묶는 역할을 합니다.</div>
            </div>
          </a>
        </div>
        <div id="selectCategory" className="ui multiple search selection dropdown"  style={{marginRight: 10}}>
          <input name="tags" type="hidden" />
            <i className="dropdown icon"></i>
            <div className="default text">Skills</div>
            <div className="menu">
              {
                categories.toArray().map(v => <div className="item" data-value={v.get('id')}>{v.get('title')}</div>)
              }
            </div>
        </div>
        <div className="ui button primary" >확인</div>
      </div>


      <div className="ui segment">
        <h3 className="header">게시판 입력</h3>
        <div className="ui divider"></div>
        <div className="ui list">
          <a className="item">
            <i className="right triangle icon"></i>
            <div className="content">
              <div className="header">유저들의 활동장소</div>
              <div className="description">여기에서 유저들이 글을 올리고 활동합니다.</div>
            </div>
          </a>
        </div>
        <div className="ui form">
          <div className="field">
            <label>게시판 제목</label>
            <input placeholder="게시판 제목" name="title" type="text" />
          </div>
          <div className="field">
            <label>게시판 설명</label>
            <input placeholder="게시판 설명" name="description" type="text" />
          </div>
          <div className="ui primary submit button">확인</div>
          <div className="ui clear button">리셋</div>
        </div>
      </div>
    </div>
    )
  }
}));

module.exports = SubmitForm;
