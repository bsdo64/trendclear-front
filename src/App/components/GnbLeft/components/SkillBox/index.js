import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from '../../index.css';
import ReactTooltip from 'react-tooltip';
import moment from '../../../../Lib/MomentLib.js';

import './skill.scss';
class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {init: this.props.init || 0};

    this.tick = this.tick.bind(this);
  }
  tick() {
    this.setState({init: this.state.init - 1});
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevState.init === 1) {
      setTimeout(() => {
        const type = this.props.type || 'default';

        clearInterval(this[type]);
        this[type] = null;

        this.props.toggleSkill();
      }, 200); // 200ms in CSS
    }
  }

  componentDidMount() {
    const type = this.props.type || 'default';

    if (this.state.init > 0 && !this[type]) {
      this.props.toggleSkill();

      clearInterval(this[type]);
      this[type] = null;

      this[type] = setInterval(this.tick, 1000);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    const self = this;
    const type = nextProps.type || 'default';

    if (nextProps.init > 0 && !this[type]) {
      this.props.toggleSkill();

      this.setState({init: nextProps.init}, () => {

        clearInterval(self[type]);
        self[type] = null;

        self[type] = setInterval(self.tick, 1000);
      });
    }
  }
  componentWillUnmount() {
    const type = this.props.type || 'default';
    clearInterval(this[type]);
    this[type] = null;
  }

  render() {
    const time = this.state.init;

    return (
      <span className={((time === 0) ? 'skill_cool_effect' : ((time > 0)
        ? 'skill_cool'
        : ''))}>
        {this.state.init}
      </span>
    );
  }
}

Timer.propTypes = {
  init: PropTypes.number,
  type: PropTypes.string,
  toggleSkill: PropTypes.func,
};

class CreateSkill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.toggleSkill = this.toggleSkill.bind(this);
  }
  toggleSkill() {
    this.setState({show: !this.state.show})
  }
  render() {
    const { value, index } = this.props;

    let usingTime, cooltimeSec, endTime, gap, result;
    if (value.get('using_at')) {
      usingTime = moment(value.get('using_at'));
      cooltimeSec = value.getIn(['skill', 'property', 'cooltime']);
      endTime = moment(usingTime).add(cooltimeSec, 'seconds');

      gap = (endTime - moment() ) / 1000;
      result = gap > 0 ? parseInt(gap, 10) : 0;
    } else {
      result = 0;
    }

    if (result) {
      return (
        <li className="skills" key={index}>
          <div
            data-tip
            data-for={value.getIn(['skill', 'name'])}
            className="skill">
            <Timer
              init={result}
              type={value.getIn(['skill', 'name'])}
              toggleSkill={this.toggleSkill}
            />
            <img className="ui image skill_image"
                 src={'/images/' + value.getIn(['skill', 'img'])}/>
            <ReactTooltip
              id={value.getIn(['skill', 'name'])}
              place="top"
              class="skill2"
              effect="solid">

              <div className="ui horizontal list">
                <div className="item">
                  <img className="ui mini circular image"
                       src={'/images/' + value.getIn(['skill', 'img'])}/>
                  <div className="content">
                    <div className="ui sub header">{value.getIn(
                      ['skill', 'title'])}</div>
                    <div className="meta level">레벨 : {value.getIn(['level'])}</div>
                    <div className="meta cooltime">쿨타임 : {value.getIn(
                      ['skill', 'property', 'cooltime'])}</div>
                  </div>
                </div>
              </div>
              <hr />
              {value.getIn(['skill', 'description'])}

            </ReactTooltip>
          </div>
        </li>
      );
    } else {
      return null;
    }

  }
}

class SkillBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    return (
      <ul id="skill_box" className={cx([styles.appIconList, styles.skills])}>
        {
          user
            .get('skills')
            .sortBy(value => value.get('id'))
            .map((value, index) => {
              return <CreateSkill key={index} value={value} index={index} />
            })
        }
      </ul>
    );
  }
}

SkillBox.propTypes = {
  user: PropTypes.object,
};
SkillBox.defaultProps = {};

export default SkillBox;
