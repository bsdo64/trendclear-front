/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';

import SigninAgree from './SigninAgree';
import SigninFormContents from './SigninFormContents';

require('./Signin.scss');
let SigninContents = React.createClass({
  displayName: 'SigninContents',
  propTypes: {},
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      term: false, privacy: false, agree: false
    };
  },
  submitAgreement() {
    const {term, privacy} = this.state;

    if (term && privacy) {
      this.setState({agree: true});
    }
  },
  handleCheckTerms() {
    this.setState({term: !this.state.term});
  },
  handleCheckPrivacy() {
    this.setState({privacy: !this.state.privacy});
  },
  render() {
    const {agree} = this.state;
    return (
      <div id="signing">
        {
          agree &&
          <SigninFormContents
            SigninStore={this.props.SigninStore}
          />
        }

        {
          !agree && <SigninAgree
            {...this.state}
            handleCheckTerms={this.handleCheckTerms}
            handleCheckPrivacy={this.handleCheckPrivacy}
            submitAgreement={this.submitAgreement}/>
        }
      </div>
    );
  }
});

export default SigninContents;
