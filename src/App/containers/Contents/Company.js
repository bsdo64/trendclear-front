import React from 'react';
import { connect } from 'react-redux';
import Company from '../../components/Contents/Company';

const CompanyContainer = React.createClass({
  render() {
    return (<Company {...this.props} />);
  },
});

module.exports = connect()(CompanyContainer);

