import React from 'react';
import {connect} from 'react-redux';
import {getLoginUser} from '../Util/func';

import Select from 'react-select';
import Submit from '../../Components/Contents/Submit';

const SubmitForumPrefix = React.createClass({
  componentDidMount() {
    $('.search.dropdown')
      .dropdown({
        action: 'hide',
        onChange: function(value, text, $selectedItem) {
          // custom action
          console.log(value, text, $selectedItem);
        }
      });

    $('.ui.checkbox')
      .checkbox({
        onChecked: function(v) {
          console.log('onChecked called<br>', v);
        },
        onUnchecked: function(v) {
          console.log('onUnchecked called<br>', v);
        },
        onEnable: function(v) {
          console.log('onEnable called<br>', v);
        },
        onDisable: function(v) {
          console.log('onDisable called<br>', v);
        },
        onDeterminate: function(v) {
          console.log('onDeterminate called<br>', v);
        },
        onIndeterminate: function(v) {
          console.log('onIndeterminate called<br>', v);
        },
        onChange: function(v, a, b) {
          console.log('onChange called<br>', v, a, b);
        }
      })
  },

  log(val) {
    "use strict";

    console.log("Selected: ", val);
  },

  render() {
    const clubs = [
      { value: '1', label: 'world' },
      { value: '2', label: '한글' },
      { value: '3', label: '클럽' },
      { value: '4', label: '우리집' },
      { value: '5', label: 'world' }
    ];

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
        <Select
          name="club-select"
          value="3"
          simpleValue
          options={clubs}
          onChange={this.log}
          clearable={false}
        />
      </div>
      <div className="ui  segment">
        <h3 className="header">카테고리 박스 입력</h3>
        <div className="ui divider"></div>
        <div className="ui list">
          <div className="ui form">
            <div className="grouped fields">
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="example2" checked="checked" />
                    <label>Once a week</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="example2" />
                    <label>2-3 times a week</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="example2" />
                    <label>Once a day</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="example2" />
                    <label>Twice a day</label>
                </div>
              </div>
            </div>
          </div>
          <a className="item">
            <i className="right triangle icon"></i>
            <div className="content">
              <div className="header">기본적인 카테고리</div>
              <div className="description">카테고리 박스를 기준으로 컨텐츠를 구분합니다.</div>
            </div>
          </a>
          <a className="item">
            <i className="help icon"></i>
            <div className="content">
              <div className="description">카테고리 박스의 이름은 중복이 허용되지 않습니다.</div>
            </div>
          </a>
        </div>
        <div className="ui fluid action input">
          <input type="text" placeholder="Search..." />
          <div className="ui button">Search</div>
        </div>
      </div>
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
          <a className="item">
            <i className="help icon"></i>
            <div className="content">
              <div className="description">포럼 그룹 이름은 중복이 허용됩니다.</div>
            </div>
          </a>
        </div>
        <div className="ui fluid action input">
          <input type="text" placeholder="Search..." />
          <div className="ui button">Search</div>
        </div>
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
        <div className="ui fluid action input">
          <input type="text" placeholder="Search..." />
          <div className="ui button">Search</div>
        </div>
      </div>
    </div>
    )
  }
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    SubmitStore: getUIState('Submit'),
    LoginStore: getUIState('Login'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitForumPrefix);
