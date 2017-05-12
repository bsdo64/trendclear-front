import React from 'react';
import { connect } from 'react-redux';
import Company from '../../components/Contents/Company';

class CompanyContainer extends React.Component {
  render() {
    return (<Company {...this.props} />);
  }
}

export default connect()(CompanyContainer);

