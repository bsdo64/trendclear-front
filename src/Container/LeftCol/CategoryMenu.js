var React = require('react');

var CategoryList = require('../../Components/CategoryList');

var MenuContainer = React.createClass({
  displayName: 'MenuContainer',
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
            {title: '옷'}
          ]
        }]
      }
    }
  },
  render() {
    return (
      <CategoryList categories={this.state.categories} />
    );
  }
});

module.exports = MenuContainer;
