import React from 'react';
import PropTypes from 'prop-types';

require('./index.scss');
const About = () => {
  return (
    <div id="about">
      <div className="container">
        <div className="ui vertical stripe segment padded">
          <h1 className="ui header">베나클 Venacle</h1>
        </div>

        <div className="ui vertical stripe segment">
          <div className="ui text container">
            <h3 className="ui header">베나클의 철학</h3>
            <p style={{textAlign: 'center'}}>
              <b>{`"세상의 모든 이슈를 모아 효과적으로 공유하고 소통할수 있도록 도와주는 것"`}</b>
            </p>
          </div>
        </div>

        <div className="ui vertical stripe segment">

          <div className="ui middle aligned stackable grid container">
            <div className="row">
              <div className="eight wide column">
                <h3 className="ui header">세상의 모든 이슈</h3>
                <p>세상의 모든 이슈와 트렌드를 공유하세요. </p>
                <p>
                  여기저기 흩어져 있는 귀중한 자료들을 한곳에 모아 가능한 많은 사람들에게 공유하세요.
                  공유하고 소통하는만큼 경험치와 보상을 받습니다.
                </p>
                <p>
                  또한, 개개인의 가장 원하는 가치의 정보를 실시간으로 받아보세요.
                  누구나 게시판을 생성 할 수 있고, 사람들이 만든 게시판들을 모아 개인별로 컬렉션을 만들어
                  쉽게 컨텐츠를 받아 보세요!
                </p>
                <p>
                  세상의 모든 이슈들이 한곳에 모인곳 베나클입니다
                </p>
                <h3 className="ui header">개개인의 맞춤형 컨텐츠</h3>
                <p>
                  더 이상 피곤한 사회 관계에 얽매이지 마세요!
                  인터넷의 철학인 익명성을 최대한 활용하여 누구나 쉽게 공유하고 싶은 주제와 글을 올리고 전세계 모든 사람들과
                  실시간으로 소통하세요!
                </p>
                <h3 className="ui header">즐기는 커뮤니티</h3>
                <p>
                  베나클에서 활동하면 할수록, 그리고 양질의 컨텐츠를 업로드하고 사람들의 공감을 많이 얻을 수록,
                  유저는 보상을 받습니다. 각 계정마다 레벨 시스템과 경험치, 그리고 스킬들을 활용하여 커뮤니티를 무궁무진하게
                  활용 할 수 있습니다.
                </p>
              </div>
              <div className="six wide right floated column">
                <div className="company-info">
                  <h4 className="ui header">
                    Venacle
                  </h4>
                  <ul>
                    <li>
                      <strong>창립</strong><br />
                      2016년 9월 19일
                    </li>
                    <li>
                      <strong>창립자</strong><br />
                      도병수
                    </li>
                    <li>
                      <strong>회사</strong><br />
                      서울특별시<br />
                      마포구 영화로18안길 10<br />
                      401호
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe quote segment">
          <div className="ui equal width stackable internally celled grid">
            <div className="center aligned row">
              <div className="column">
                <h3>컬렉션</h3>
                <p>원하는 게시판들을 모아 볼 수 있는 개인 폴더</p>
              </div>
              <div className="column">
                <h3>게시판</h3>
                <p>주제에 따른 커뮤니티</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe segment">
          <div className="ui text container">
            <div className="ui list">
              <div className="item">
                <i className="home icon"/>
                <div className="content">
                  베나클
                </div>
              </div>
              <div className="item">
                <i className="marker icon"/>
                <div className="content">
                  서울특별시
                  마포구 영화로18안길 10
                  401호
                </div>
              </div>
              <div className="item">
                <i className="mail icon"/>
                <div className="content">
                  <a
                    href="mailto:webmaster@venacle.com">webmaster@venacle.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};

const Company = props => {
  return <About />;
};

Company.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Company;
