import React from 'react';

const AddForum1 = React.createClass({
  render() {
    const {url} = this.props;
    return (
      <div>
        <img
          src={url}
          style={{
            width: '100%',
            borderTop: '1px solid #abc',
            borderBottom: '1px solid #abc'
          }} />
      </div>
    );
  }
});

export default AddForum1;