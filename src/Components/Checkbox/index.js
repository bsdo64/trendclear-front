const _extends = Object.assign || function (target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

const React = require('react');

function checkbox(name, checkedValues, onChange) {
  return function Checkbox(props) {
    const checked = checkedValues.indexOf(props.value) >= 0;
    const boxChange = onChange.bind(null, props.value);

    return React.createElement('input', _extends({}, props, {
      type: 'checkbox',
      name: name,
      checked: checked,
      onChange: boxChange
    }));
  };
}

module.exports = React.createClass({
  displayName: 'CheckboxGroup',
  getInitialState: function getInitialState() {
    return {
      value: this.props.value || this.props.defaultValue || []
    };
  },
  isControlledComponent: function isControlledComponent() {
    return !!this.props.value;
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (newProps.value) {
      this.setState({ value: newProps.value });
    }
  },

  onCheckboxChange: function onCheckboxChange(checkboxValue, event) {
    let newValue;
    if (event.target.checked) {
      newValue = this.state.value.concat(checkboxValue);
    } else {
      newValue = this.state.value.filter(function (v) {
        return v !== checkboxValue;
      });
    }

    if (!this.isControlledComponent()) {
      this.setState({ value: newValue });
    } else {
      this.setState({ value: this.props.value });
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(newValue);
    }
  },
  getValue: function getValue() {
    return this.state.value;
  },
  render: function render() {
    const _props = this.props;
    const name = _props.name;
    const value = _props.value;
    const children = _props.children;

    let checkedValues;
    if (!this.isControlledComponent()) {
      checkedValues = this.state.value;
    } else {
      checkedValues = value;
    }

    const renderedChildren = children(checkbox(name, checkedValues, this.onCheckboxChange));
    return renderedChildren && React.Children.only(renderedChildren);
  }
});