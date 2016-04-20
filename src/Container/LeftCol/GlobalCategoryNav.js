var React = require('react');
var CategoryNav = require('../../Components/CategoryNav');

var LeftCalCategoryNav = React.createClass({
  displayName: 'LeftCalCategoryNav',
  getInitialState() {
    return {
      categories: {
        menuHeader: '베스트',
        subHeader: '전체보기',
        subList: [{
          header: '의류',
          list: [
            {title: '옷'},
            {title: '옷'},
            {title: '우리집'}
          ]
        }]
      }
    }
  },
  render() {
    return (
      <CategoryNav categories={this.state.categories} />
    );
  }
});

module.exports = LeftCalCategoryNav;
