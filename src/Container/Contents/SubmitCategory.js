import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';
import SubmitStore from '../../Stores/SubmitStore';

import Submit from '../../Components/Contents/Submit';

const SigninContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [SubmitStore, LoginStore, UserStore];
  },

  getPropsFromStores() {
    return {
      SubmitStore: SubmitStore.getState(),
      UserStore: UserStore.getState(),
      LoginStore: LoginStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (
    <div className="ui two column doubling stackable grid container">
      <div className="column">
        <div className="ui card">
          <div className="content">
            <div className="header">클럽 선택</div>
          </div>
          <div className="content">
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
                <i className="right triangle icon"></i>
                <div className="content">
                  <div className="header">최소한 하나의 클럽은 꼭 선택하여야 합니다.</div>
                </div>
              </a>
              <a className="item">
                <i className="help icon"></i>
                <div className="content">
                  <div className="description">추가하고 싶은 클럽이 있다면 의견을 보내주세요</div>
                </div>
              </a>
            </div>
          </div>
          <div className="extra content">
            <div className="ui fluid action input">
              <input type="text" placeholder="Search..." />
              <div className="ui button">Search</div>
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="ui card">
          <div className="content">
            <div className="header">클럽 선택</div>
          </div>
          <div className="content">
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
                <i className="right triangle icon"></i>
                <div className="content">
                  <div className="header">최소한 하나의 클럽은 꼭 선택하여야 합니다.</div>
                </div>
              </a>
              <a className="item">
                <i className="help icon"></i>
                <div className="content">
                  <div className="description">추가하고 싶은 클럽이 있다면 의견을 보내주세요</div>
                </div>
              </a>
            </div>
          </div>
          <div className="extra content">
            <div className="ui fluid action input">
              <input type="text" placeholder="Search..." />
              <div className="ui button">Search</div>
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="ui card">
          <div className="content">
            <div className="header">클럽 선택</div>
          </div>
          <div className="content">
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
                <i className="right triangle icon"></i>
                <div className="content">
                  <div className="header">최소한 하나의 클럽은 꼭 선택하여야 합니다.</div>
                </div>
              </a>
              <a className="item">
                <i className="help icon"></i>
                <div className="content">
                  <div className="description">추가하고 싶은 클럽이 있다면 의견을 보내주세요</div>
                </div>
              </a>
            </div>
          </div>
          <div className="extra content">
            <div className="ui fluid action input">
              <input type="text" placeholder="Search..." />
              <div className="ui button">Search</div>
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="ui card">
          <div className="content">
            <div className="header">클럽 선택</div>
          </div>
          <div className="content">
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
                <i className="right triangle icon"></i>
                <div className="content">
                  <div className="header">최소한 하나의 클럽은 꼭 선택하여야 합니다.</div>
                </div>
              </a>
              <a className="item">
                <i className="help icon"></i>
                <div className="content">
                  <div className="description">추가하고 싶은 클럽이 있다면 의견을 보내주세요</div>
                </div>
              </a>
            </div>
          </div>
          <div className="extra content">
            <div className="ui fluid action input">
              <input type="text" placeholder="Search..." />
              <div className="ui button">Search</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}));

module.exports = SigninContainer;
