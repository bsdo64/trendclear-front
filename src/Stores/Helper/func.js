export function initListener(Store) {
  "use strict";
  Store.on('bootstrap', function (value) {
    Store.setState(value);
  });

  Store.on('beforeEach', function beforeEachHandler(value) {
    "use strict";

    const { payload, state } = value;
    if (Array.isArray(Store.actionListeners[payload.type])) {
      console.group(Store.displayName);
      console.log('Before :\t', state.toJS());
      console.log('payload :\t', payload.payload);
    }
  });
  Store.on('afterEach', function afterEachHandler(value) {
    "use strict";

    const { payload, state } = value;
    if (Array.isArray(Store.actionListeners[payload.type])) {
      console.log('After :\t', state.toJS());
      console.groupEnd(Store.displayName);
    }
  });
}

export function setMergeState(changedData) {
  "use strict";

  let nextState = this.state.merge(changedData);
  this.setState(nextState);
}