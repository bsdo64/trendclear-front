import React from 'react';
import ReactDOM from 'react-dom';
import alt from '../Utills/alt';

var LeftColGlobalCategoryNav = require('../Container/LeftCol/GlobalCategoryNav');
var LeftColCategoryMenu = require('../Container/LeftCol/CategoryMenu.js');
var HeaderMyMenu = require('../Container/Header/MyMenu');
var LoginModalContainer = require('../Container/Modal/LoginModalContainer');

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
      }]
    }
  },
  LoginStore: {
    isLogin: false,
    openLoginModal: false,
    loginSuccess: false,
    loginFail: false
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
