import React from 'react';

import ForumActions from '../../../../Actions/ForumActions';
import ForumSettingActions from '../../../../Actions/ForumSettingActions';

const PrefixBox = React.createClass({
  getInitialState() {
    return {
      openAdder: false,
      prefixText: null,
      updateItemId: null,
      updateItemText: null
    };
  },

  openPrefixUpdate(id) {
    "use strict";

    this.setState({
      updateItemId: id
    });
  },

  updateOnChange(e) {
    "use strict";

    this.setState({
      updateItemText: e.target.value
    });
  },

  sendUpdate(e) {
    "use strict";

    const charCode = e.charCode;
    const text = e.target.value;
    const {forum} = this.props;

    if (charCode == 13) {
      ForumSettingActions.updateForumPrefix({
        id: this.state.updateItemId,
        forumId: forum.get('id'),
        prefixName: text
      });
      this.setState({
        openAdder: false,
        prefixText: null,
        updateItemId: null,
        updateItemText: null
      });
    }
  },

  prefixDelete(id, e) {
    "use strict";

    ForumSettingActions.deleteForumPrefix({
      id: id
    });
  },

  createPrefixItem (p) {
    "use strict";

    if (p.get('id') === this.state.updateItemId) {
      return (
        <li key={p.get('id')}>
          <input
            defaultValue={p.get('name')}
            onChange={this.updateOnChange}
            onKeyPress={this.sendUpdate}
          />
        </li>
      )
    } else {
      return (
        <li key={p.get('id')}>
          {p.get('name')}
          <i className="fa fa-pencil" onClick={this.openPrefixUpdate.bind(this, p.get('id'))}/>
          <i className="fa fa-remove" onClick={this.prefixDelete.bind(this, p.get('id'))}/>
        </li>
      )
    }
  },
  triggerOpenAddPrefix() {
    "use strict";

    this.setState({openAdder: !this.state.openAdder})

  },
  sendPrefix(e) {
    "use strict";
    const charCode = e.charCode;
    const {forum} = this.props;

    if (charCode == 13) {
      ForumSettingActions.addForumPrefix({
        forumId: forum.get('id'),
        prefixName: this.state.prefixText
      });
      this.setState({
        openAdder: false,
        prefixText: null
      });
    }
  },
  prefixText() {
    "use strict";

    this.setState({
      prefixText: this.refs.input_prefix.value.trim()
    })
  },
  render() {
    const {prefixes} = this.props;
    const self = this;

    const adder = this.state.openAdder
      ? (<div><input ref="input_prefix" type="text" onKeyPress={this.sendPrefix} onChange={this.prefixText}/></div>)
      : prefixes.size < 5
        ? <div onClick={this.triggerOpenAddPrefix}>추가 +</div>
        : null;

    return (
      <ul>
        {prefixes.map(self.createPrefixItem)}
        <li >
          {adder}
        </li>
      </ul>
    );
  }
});

const ForumPrefix = React.createClass({
  componentWillUnmount() {
    ForumSettingActions.resetButton();
  },

  updateForumPrefix(e) {
    e.preventDefault();
    e.stopPropagation();

    const {ForumSettingStore} = this.props;
    const forumInfo = ForumSettingStore.get('forumInfo');
    const forum = ForumSettingStore.get('forum');

    ForumActions.patchForum({
      id: forum.get('id'),
      sub_header: forumInfo ? forumInfo.get('forum_sub_header') : forum.get('sub_header'),
      description: forumInfo ? forumInfo.get('forum_description') : forum.get('description'),
      rule: forumInfo ? forumInfo.get('forum_rule') : forum.get('rule')
    })
  },

  changeForm(e) {
    ForumSettingActions.changeForumData({[e.target.name]: e.target.value.trim()})
  },

  render() {
    const {ForumSettingStore} = this.props;
    const forum = ForumSettingStore.get('forum');

    if (forum) {
      const patch = ForumSettingStore.getIn(['forumInfo', 'success']);
      const patchSuccess = patch === 'updated' ? true : patch === 'failed' ? false : null;
      let button;
      
      if (patchSuccess === true) {
        button = <div className="ui submit button positive">변경 완료</div>
      } else if (patchSuccess === false) {
        button = <button type="submit" className="ui submit button negative">변경 실패</button>
      } else if (patchSuccess === null) {
        button = <button type="submit" className="ui submit button primary">변경</button>
      }

      return (
        <div className="ui container" style={{margin: 10, width: 700}}>
          <div className="ui segments ">
            <div className="ui segment">
              <h3 className="ui header">말머리 설정</h3>
              <div className="ui divider"></div>
              <div className="ui list">
                <a className="item"><i className="right triangle icon"></i>
                  <div className="content">
                    <div className="header">말머리를 설정합니다</div>
                    <div className="description"> - 최대 5개의 말머리를 설정할 수 있습니다</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="ui segment">
              <PrefixBox
                prefixes={forum.get('prefixes')}
                forum={forum}
              />
            </div>
          </div>
        </div>
      )
    }

    return <div></div>
  }
});

export default ForumPrefix;