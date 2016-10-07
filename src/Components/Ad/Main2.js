import React from 'react';

const Main2 = React.createClass({
  render() {
    const {url} = this.props;
    return (
      <div style={{marginTop: 10}}>
        <img
          src={url}
          style={{
            width: '100%'
          }} />
      </div>
    );
  }
});

export default Main2;
