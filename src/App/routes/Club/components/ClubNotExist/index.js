import React, { Component } from 'react';

class ClubNotExist extends Component {
  componentWillUnmount() {

  }

  render() {
    return (
      <div style={{padding: 10}}>
        <div className='ui segment'>
          존재하지 않는 클럽입니다
        </div>
      </div>
    )
  }
}

ClubNotExist.propTypes = {};
ClubNotExist.defaultProps = {};

export default ClubNotExist;
