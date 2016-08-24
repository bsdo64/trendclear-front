let count = 0;
export function initListener(Store) {
  "use strict";
  Store.on('bootstrap', function initBootStrapListener(nextState) {

    const prevState = Store.state;
    if (!nextState.equals(prevState)) {
      count++;
      Store.setState(nextState);
    }
  });

  Store.on('beforeEach', function beforeEachHandler(value) {
    "use strict";

    if (process.env.NODE_ENV !== 'production') {
      const { payload, state } = value;
      if (Array.isArray(Store.actionListeners[payload.type])) {
        console.group(Store.displayName);
        console.log('Before :\t', state.toJS());
        console.log('payload :\t', payload.payload);
      }
    }
  });
  Store.on('afterEach', function afterEachHandler(value) {
    "use strict";

    if (process.env.NODE_ENV !== 'production') {
      const { payload, state } = value;
      if (Array.isArray(Store.actionListeners[payload.type])) {
        console.log('After :\t', state.toJS());
        console.groupEnd(Store.displayName);
      }
    }
  });
}

export function setMergeState(changedData) {
  "use strict";

  let nextState = this.state.merge(changedData);
  if (this.state.equals(nextState)) {
    return null;
  }

  this.setState(nextState);
}

export function setMergeDeep(changedData) {
  "use strict";

  let nextState = this.state.mergeDeep(changedData);
  if (this.state.equals(nextState)) {
    return null;
  }

  this.setState(nextState);
}

export function locationHref(url) {
  "use strict";

  window.location.href = url;
}