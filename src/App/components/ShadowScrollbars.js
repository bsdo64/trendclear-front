import css from 'dom-css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

class ShadowScrollbars extends Component {

  constructor(props, ...rest) {
    super(props, ...rest);

    this.scrollbars = null;
    this.shadowBottom = null;
    this.shadowTop = null;

    this.state = {
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(values) {
    const { scrollTop, scrollHeight, clientHeight } = values;
    const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    css(this.shadowTop, { opacity: shadowTopOpacity });
    css(this.shadowBottom, { opacity: shadowBottomOpacity });
  }

  render() {
    const { style, ...props } = this.props;
    const containerStyle = {
      ...style,
      position: 'relative'
    };
    const shadowTopStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 10,
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)'
    };
    const shadowBottomStyle = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 10,
      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)'
    };
    return (
      <div style={containerStyle}>
        <Scrollbars
          ref={r => this.scrollbars = r}
          onUpdate={this.handleUpdate}
          {...props}/>
        <div
          ref={r => this.shadowTop = r}
          style={shadowTopStyle}/>
        <div
          ref={r => this.shadowBottom = r}
          style={shadowBottomStyle}/>
      </div>
    );
  }
}

ShadowScrollbars.propTypes = {
  style: PropTypes.object
};

export default ShadowScrollbars;
