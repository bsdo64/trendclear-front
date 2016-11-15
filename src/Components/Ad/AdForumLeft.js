import React from 'react';

const AdForumLeft = React.createClass({
  render() {
    const { url } = this.props;
    return (
      <div>
        <img
          src={url}
          style={{
            padding: 10,
            float: 'right'
          }}/>
      </div>
    )
  }
});

export default AdForumLeft;
