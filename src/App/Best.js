var React = require('react');
var ReactDOM = require('react-dom');

var LeftColGlobalCategoryNav = require('../Container/LeftCol/GlobalCategoryNav');
var LeftColCategoryMenu = require('../Container/LeftCol/CategoryMenu.js');

ReactDOM.render(
  <LeftColGlobalCategoryNav />,
  document.getElementById('category_menu')
);

ReactDOM.render(
  <LeftColCategoryMenu />,
  document.getElementById('category')
);