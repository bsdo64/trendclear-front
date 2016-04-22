import React from 'react';

const BestPagination = React.createClass({
  render() {
    return (
      <div className="ui items">
        <div className="ui item load_more_button">
          <div className="ui segment fluid center aligned">더 보기</div>
        </div>
        <div className="ui item load_more_loading">
          <div className="ui text active loader inline centered"></div>
        </div>
      </div>
    );
  }
});

export default BestPagination;
