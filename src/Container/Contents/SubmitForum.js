import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import GnbStore from '../../Stores/GnbStore';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';

import CommunityActions from '../../Actions/CommunityActions';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

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
      selectClubValue: null,
      selectClub: false,
      confirmClub: false,
      disableClub: false,

      selectCategoryGroupId: null,
      selectCategoryGroupValue: null,
      selectCategoryGroup: false,
      newCategoryGroup: false,
      dupCategoryGroup: false,
      confirmCategoryGroup: false,
      disableCategoryGroup: false,

      selectCategoryId: null,
      selectCategoryValue: null,
      selectCategory: false,
      newCategory: false,
      dupCategory: false,
      confirmCategory: false,
      disableCategory: false,

      disableForum: false,
      selectForumValue: null,
      confirmForum: false
    };
  },

  componentDidMount() {
    const self = this;

    $('#selectClub.search.dropdown')
      .dropdown({
        onChange: function(value, text, $selectedItem) {
          // custom action
          console.log(value, text, $selectedItem);
          self.setState({selectClubId: value, selectClub: true, selectClubValue: text})
        }
      });
  },

  componentDidUpdate(prevProps, prevState) {
    const self = this;

    $('#selectClub.search.dropdown')
      .dropdown({
        onChange: function(value, text, $selectedItem) {
          // custom action
          console.log(value, text, $selectedItem);
          self.setState({selectClubId: value, selectClub: true, selectClubValue: text})
        }
      });

    $('#selectCategoryGroup.search.dropdown')
      .dropdown({
        allowAdditions: true,
        onChange: function(value, text, $selectedItem) {
          // custom action
          if (isNumeric(value) && (value !== text)) {
            console.log('onChange : ', value, text, $selectedItem);
            self.setState({selectCategoryGroupId: value, selectCategoryGroup: true, selectCategoryGroupValue: text})
          } else {
            console.log('onAdd : ', value, text, $selectedItem);
            self.setState({newCategoryGroup: true, selectCategoryGroup: true, selectCategoryGroupValue: text})
          }
        }
      });

    $('#selectCategory.search.dropdown')
      .dropdown({
        allowAdditions: true,
        onChange: function(value, text, $selectedItem) {
          // custom action
          if (isNumeric(value) && (value !== text)) {
            console.log('onChange : ', value, text, $selectedItem);
            self.setState({selectCategoryId: value, selectCategory: true, selectCategoryValue: text})
          } else {
            console.log('onAdd : ', value, text, $selectedItem);
            self.setState({newCategory: true, selectCategory: true, selectCategoryValue: text})
          }
        }
      });
  },


  log(val) {
    "use strict";

    console.log("Selected: ", val);
  },

  resetAll() {
    "use strict";

    this.setState({
      selectClubId: null,
      selectClubValue: null,
      selectClub: false,
      confirmClub: false,
      disableClub: false,

      selectCategoryGroupId: null,
      selectCategoryGroupValue: null,
      selectCategoryGroup: false,
      newCategoryGroup: false,
      dupCategoryGroup: false,
      confirmCategoryGroup: false,
      disableCategoryGroup: false,

      selectCategoryId: null,
      selectCategoryValue: null,
      selectCategory: false,
      newCategory: false,
      dupCategory: false,
      confirmCategory: false,
      disableCategory: false,

      disableForum: false,
      selectForumValue: null,
      confirmForum: false
    });
  },

  submitCategory() {
    "use strict";

    const category = {
      club: {id: this.state.selectClubId},
      categoryGroup: {id: this.state.selectCategoryGroupId || null, value: this.state.selectCategoryGroupValue},
      category: {id: this.state.selectCategoryId || null, value: this.state.selectCategoryValue},
      forum: {value: this.state.selectForumValue}
    };

    CommunityActions.createCommunity(category);
  },

  confirmForum() {
    "use strict";
    const {forumTitle, forumDesc} = this.refs;
    if (forumTitle.value && forumDesc.value) {
      this.setState({confirmForum: true, selectForumValue: forumTitle.value, disableForum: true})
    }

  },

  confirmCategory() {
    "use strict";

    if (this.state.newCategoryGroup) {
      const {categoryTitle} = this.refs;
      this.setState({confirmCategory: true, disableCategory: true, newCategory: true, selectCategory: true, selectCategoryValue: categoryTitle.value});
    } else {
      const {selectCategory, selectCategoryId, newCategory, disableCategory} = this.state;
      const isSelectActive = selectCategory && (selectCategoryId || newCategory) && !disableCategory;

      if (isSelectActive) {
        this.setState({confirmCategory: true, disableCategory: true});
      }
    }
  },

  confirmCategoryGroup() {
    "use strict";

    const {selectCategoryGroup, selectCategoryGroupId, newCategoryGroup, disableCategoryGroup} = this.state;
    const isSelectActive = selectCategoryGroup && (selectCategoryGroupId || newCategoryGroup) && !disableCategoryGroup;

    if (isSelectActive) {
      this.setState({confirmCategoryGroup: true, disableCategoryGroup: true});
    }
  },

  confirmClub() {
    "use strict";

    const {selectClub, selectClubId, disableClub} = this.state;
    const isSelectActive = selectClub && selectClubId && !disableClub;

    if (isSelectActive) {
      this.setState({confirmClub: true, disableClub: true});
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
      <div className="ui container" style={{margin: 10, width: 700}}>
        <div className={"ui segments "} >

          <div className="ui segment">
            <div className="ui header">
              클럽 만들기
            </div>

            <div className="ui large breadcrumb">
              <a className="section">{this.state.selectClubValue}</a>
              <i className="right chevron icon divider"></i>
              <a className="section">{this.state.selectCategoryGroupValue}</a>
              <i className="right chevron icon divider"></i>
              <a className="section">{this.state.selectCategoryValue}</a>
              <i className="right chevron icon divider"></i>
              <div className="active section">{this.state.selectForumValue}</div>
            </div>
          </div>

          {
            !this.state.confirmClub && !this.state.disableClub &&
            <div className={"ui segment " + (this.state.disableClub ? 'disabled' : '')}>
              <h3 className="ui header">클럽 선택</h3>
              <div className="ui divider"></div>
              <div className="ui list">
                <a className="item">
                  <i className="right triangle icon"></i>
                  <div className="content">
                    <div className="header">클럽은 베나클에서 관리합니다.</div>
                    <div className="description">가장 큰 주제입니다.</div>
                  </div>
                </a>
                <a className="item">
                  <i className="help icon"></i>
                  <div className="content">
                    <div className="description">추가하고 싶은 클럽이 있다면 의견을 보내주세요</div>
                  </div>
                </a>
              </div>
              <div id="selectClub" className={"ui search selection dropdown "  + (this.state.disableClub ? 'disabled' : '')} style={{marginRight: 10}}>
                <input name="tags" type="hidden" />
                <i className="dropdown icon"></i>
                <div className="default text">클럽 선택..</div>
                <div className="menu">
                  {
                    clubs.toArray().map(v => <div className="item" data-value={v.get('id')}>{v.get('title')}</div>)
                  }
                </div>
              </div>
              <div className={"ui button primary "} onClick={this.confirmClub}>확인</div>
            </div>
          }

          {
            !this.state.confirmCategoryGroup && !this.state.disableCategoryGroup &&
            this.state.confirmClub && this.state.selectClubId &&
            <div className={"ui segment " + (this.state.disableCategoryGroup ? 'disabled' : '')}>
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
              <div className={"ui button primary "} onClick={this.confirmCategoryGroup}>확인</div>
            </div>
          }

          {
            !this.state.confirmCategory && !this.state.disableCategory &&
            this.state.confirmCategoryGroup && (this.state.selectCategoryGroupId || this.state.newCategoryGroup) &&
            <div className={"ui segment " + (this.state.disableCategory ? 'disabled' : '')}>
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
              {
                !this.state.newCategoryGroup &&
                <div id="selectCategory" className="ui search selection dropdown"
                     style={{marginRight: 10}}>
                  <input name="tags" type="hidden"/>
                  <i className="dropdown icon"></i>
                  <div className="default text">Skills</div>
                  <div className="menu">
                    {
                      categoryGroups.getIn([this.state.selectCategoryGroupId, 'categories']).map(id =>
                        <div className="item" data-value={categories.get(id.toString()).get('id')}>{categories.get(id.toString()).get('title')}</div>)
                    }
                  </div>
                </div>
              }
              {
                this.state.newCategoryGroup &&
                <div className="ui input">
                  <input ref="categoryTitle" type="text" placeholder="새로운 포럼 그룹 입력" />
                </div>
              }

              <div className={"ui button primary "} onClick={this.confirmCategory}>확인</div>
            </div>
          }

          {
            !this.state.confirmForum && !this.state.disableForum &&
            this.state.confirmCategory && (this.state.selectCategoryId || this.state.newCategory) &&
            <div className={"ui segment " + (this.state.disableForum ? 'disabled' : '')}>
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
                  <input ref="forumTitle" placeholder="게시판 제목" name="title" type="text" />
                </div>
                <div className="field">
                  <label>게시판 설명</label>
                  <input ref="forumDesc" placeholder="게시판 설명" name="description" type="text" />
                </div>
                <div className="ui primary submit button" onClick={this.confirmForum}>확인</div>
              </div>
            </div>
          }

        </div>

        {
          this.state.confirmForum && this.state.disableForum &&
          this.state.confirmCategory && this.state.disableCategory &&
          this.state.confirmCategoryGroup && this.state.disableCategoryGroup &&
          this.state.confirmClub && this.state.disableClub &&
          <div className="ui segment">
            <h3>입력 확인하기</h3>
            <div className="ui divider"></div>
            <h4>아래 사항이 맞습니까</h4>
            <div className="ui large breadcrumb">
              <a className="section">{this.state.selectClubValue}</a>
              <i className="right chevron icon divider"></i>
              <a className="section">{this.state.selectCategoryGroupValue}</a>
              <i className="right chevron icon divider"></i>
              <a className="section">{this.state.selectCategoryValue}</a>
              <i className="right chevron icon divider"></i>
              <div className="active section">{this.state.selectForumValue}</div>
            </div>

            <div className="ui ">
              <div className="ui primary submit button" onClick={this.submitCategory}>확인</div>
              <div className="ui clear button" onClick={this.resetAll}>리셋</div>
            </div>
          </div>
        }
        </div>
    )
  }
}));

module.exports = SubmitForm;
