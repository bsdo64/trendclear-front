export function initListener(Store) {
  "use strict";

  Store.on('beforeEach', function (value) {
    "use strict";

    const payload = value.payload;
    const state = value.state;
    console.group(Store.displayName);
    console.log('Before :\t', state.toJS());
    console.log('payload :\t', payload.payload);
  });
  Store.on('afterEach', function (value) {
    "use strict";

    const state = value.state;
    console.log('After :\t', state.toJS());
    console.groupEnd(Store.displayName);
  });
}

export function setMergeState(changedData) {
  "use strict";

  let nextState = this.state.merge(changedData);
  this.setState(nextState);
}