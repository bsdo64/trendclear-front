var React = require('react');

var CategoryList = require('../../Components/CategoryList');
var Immutable = require('immutable');

var MenuContainer = React.createClass({
  displayName: 'MenuContainer',
  getInitialState() {
    return {
      categories: new Immutable.fromJS({
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
      })
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState.categories !== this.state.categories);
    return nextState.categories !== this.state.categories;
  },
  render() {
    return (
      <CategoryList categories={this.state.categories} />
    );
  }
});

module.exports = MenuContainer;
