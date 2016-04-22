import React from 'react';
import ReactDOM from 'react-dom';
import alt from '../Utills/alt';

var LeftColGlobalCategoryNav = require('../Container/LeftCol/GlobalCategoryNav');
var LeftColCategoryMenu = require('../Container/LeftCol/CategoryMenu.js');
var HeaderMyMenu = require('../Container/Header/MyMenu');
var LoginModalContainer = require('../Container/Modal/LoginModalContainer');
var WidgetContainer = require('../Container/RightCol/WidgetContainer');
var ContentsContainer = require('../Container/Contents/Best');

alt.bootstrap(JSON.stringify({
  GnbStore: {
    openGnb: false,
    gnbMenu: {

    },
    categoryMenu: {
      categories: [{
        menuHeader: '베스트',
        subHeader: '전체보기',
        subList: [{
          header: '의',
          list: [
            {title: '옷1'},
            {title: '안너녕'},
            {title: '우리'}
          ]
        }]
      },{
        menuHeader: '공통게시판',
        subHeader: '전체보기',
        subList: [{
          list: [
            {title: '옷1'},
            {title: '안너녕'},
            {title: '우리'},
            {title: '우리'},
            {title: '우리'}
          ]
        }]
      }]
    }
  },
  LoginStore: {
    isLogin: false,
    openLoginModal: false,
    loginSuccess: false,
    loginFail: false
  },
  UserStore: {
    trendbox: {
      id: 1,
      nick: 'Nickname',
      level: 1,
      exp: 130,
      next_exp: 250,
      reputation: 120,
      tp: 120,
      rp: 10
    },
    profile: {
      avatar_img: null,
      sex: 1,
      birth: new Date(),
      joined_at: new Date()
    },
    icon: {
      id: 1,
      img: 'icon_1.png'
    },
    grade: {
      name: '브론즈',
      img: 'grade_bronze.png'
    }
  },
  BestPostStore: {
    posts: {
      data: [
        {
          id: 1,
          title: '트랜드 클리어를 소개합니다',
          content: '<p>대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다. 모든 국민은 근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에 노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다.</p> <p>사면·감형 및 복권에 관한 사항은 법률로 정한다. 모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다. 대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을 위하여 그 취득을 알선할 수 없다.</p> <p>모든 국민은 법률이 정하는 바에 의하여 납세의 의무를 진다. 국가는 농수산물의 수급균형과 유통구조의 개선에 노력하여 가격안정을 도모함으로써 농·어민의 이익을 보호한다. 각급 선거관리위원회는 선거인명부의 작성등 선거사무와 국민투표사무에 관하여 관계 행정기관에 필요한 지시를 할 수 있다.</p> <p>지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한 규정을 제정할 수 있다. 사회적 특수계급의 제도는 인정되지 아니하며, 어떠한 형태로도 이를 창설할 수 없다. 국가는 주택개발정책등을 통하여 모든 국민이 쾌적한 주거생활을 할 수 있도록 노력하여야 한다.</p> <p>법률안에 이의가 있을 때에는 대통령은 제1항의 기간내에 이의서를 붙여 국회로 환부하고, 그 재의를 요구할 수 있다. 국회의 폐회중에도 또한 같다. 정당의 설립은 자유이며, 복수정당제는 보장된다. 대통령은 제3항과 제4항의 사유를 지체없이 공포하여야 한다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다.</p> <p>행정각부의 설치·조직과 직무범위는 법률로 정한다. 국가안전보장회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 모든 국민은 학문과 예술의 자유를 가진다. 모든 국민은 그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.</p> <p>혼인과 가족생활은 개인의 존엄과 양성의 평등을 기초로 성립되고 유지되어야 하며, 국가는 이를 보장한다. 모든 국민은 인간다운 생활을 할 권리를 가진다. 국무총리 또는 행정각부의 장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령 또는 부령을 발할 수 있다. 대법원과 각급법원의 조직은 법률로 정한다.</p> <p>대통령은 법률안의 일부에 대하여 또는 법률안을 수정하여 재의를 요구할 수 없다. 사법권은 법관으로 구성된 법원에 속한다. 재산권의 행사는 공공복리에 적합하도록 하여야 한다. 신체장애자 및 질병·노령 기타의 사유로 생활능력이 없는 국민은 법률이 정하는 바에 의하여 국가의 보호를 받는다. 국무위원은 국무총리의 제청으로 대통령이 임명한다.</p>',
          author: {
            nick: 'Destiny',
            icon: {
              img: 'icon_1.png'
            },
            sex: 1,
            avatar_img: null
          },
          categories: {
            club: {
              title: '헤어',
              category: {
                title: '탈모',
                forum: {
                  title: '탈모치료제'
                }
              }
            }
          },
          created_at: '2016-12-12 13:23',
          view_count: '1,232',
          like_count: '1,232',
          comment_count: '322'
        },
        {
          id: 2,
          title: '트랜드 클리어를 소개합니다2',
          content: '<p>대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다. 모든 국민은 근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에 노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다.</p> <p>사면·감형 및 복권에 관한 사항은 법률로 정한다. 모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다. 대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을 위하여 그 취득을 알선할 수 없다.</p> <p>모든 국민은 법률이 정하는 바에 의하여 납세의 의무를 진다. 국가는 농수산물의 수급균형과 유통구조의 개선에 노력하여 가격안정을 도모함으로써 농·어민의 이익을 보호한다. 각급 선거관리위원회는 선거인명부의 작성등 선거사무와 국민투표사무에 관하여 관계 행정기관에 필요한 지시를 할 수 있다.</p> <p>지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한 규정을 제정할 수 있다. 사회적 특수계급의 제도는 인정되지 아니하며, 어떠한 형태로도 이를 창설할 수 없다. 국가는 주택개발정책등을 통하여 모든 국민이 쾌적한 주거생활을 할 수 있도록 노력하여야 한다.</p> <p>법률안에 이의가 있을 때에는 대통령은 제1항의 기간내에 이의서를 붙여 국회로 환부하고, 그 재의를 요구할 수 있다. 국회의 폐회중에도 또한 같다. 정당의 설립은 자유이며, 복수정당제는 보장된다. 대통령은 제3항과 제4항의 사유를 지체없이 공포하여야 한다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다.</p> <p>행정각부의 설치·조직과 직무범위는 법률로 정한다. 국가안전보장회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 모든 국민은 학문과 예술의 자유를 가진다. 모든 국민은 그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.</p> <p>혼인과 가족생활은 개인의 존엄과 양성의 평등을 기초로 성립되고 유지되어야 하며, 국가는 이를 보장한다. 모든 국민은 인간다운 생활을 할 권리를 가진다. 국무총리 또는 행정각부의 장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령 또는 부령을 발할 수 있다. 대법원과 각급법원의 조직은 법률로 정한다.</p> <p>대통령은 법률안의 일부에 대하여 또는 법률안을 수정하여 재의를 요구할 수 없다. 사법권은 법관으로 구성된 법원에 속한다. 재산권의 행사는 공공복리에 적합하도록 하여야 한다. 신체장애자 및 질병·노령 기타의 사유로 생활능력이 없는 국민은 법률이 정하는 바에 의하여 국가의 보호를 받는다. 국무위원은 국무총리의 제청으로 대통령이 임명한다.</p>',
          author: {
            nick: 'Destiny',
            icon: {
              img: 'icon_1.png'
            },
            sex: 1,
            avatar_img: null
          },
          categories: {
            club: {
              title: '헤어',
              category: {
                title: '탈모',
                forum: {
                  title: '탈모치료제'
                }
              }
            }
          },
          created_at: '2016-12-12 13:23',
          view_count: '1,232',
          like_count: '1,232',
          comment_count: '322'
        }
      ],
      collection: {
        current_page: 1,
        limit: 10,
        next_page: 2,
        total: 20
      }
    }
  }
}));

ReactDOM.render(
  <LeftColGlobalCategoryNav />,
  document.getElementById('category_menu')
);

ReactDOM.render(
  <LeftColCategoryMenu />,
  document.getElementById('category')
);

ReactDOM.render(
  <HeaderMyMenu />,
  document.getElementById('top_my_area')
);

ReactDOM.render(
  <LoginModalContainer />,
  document.getElementById('modal')
);

ReactDOM.render(
  <WidgetContainer />,
  document.getElementById('right_col')
);

ReactDOM.render(
  <ContentsContainer />,
  document.getElementById('contents')
);
