var React = require('react');

require('./App.scss');
var CommentBox = React.createClass({
  getInitialState() {
    return {
      time: 0
    }
  },
  componentDidMount() {
    function timer() {
      this.setState({time: this.state.time + 1})
    }

    setInterval(timer.bind(this), 1000);
  },
  render() {
    return (
      <div className="commentBox">
        asdfasdF
        {this.state.time}
      </div>
    );
  }
});

module.exports = CommentBox;