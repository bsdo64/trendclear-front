
export function initListener(Store) {
  Store.on('bootstrap', function initBootStrapListener(nextState) {

    const prevState = Store.state;
    if (!nextState.equals(prevState)) {
      Store.setState(nextState);
    }
  });

  Store.on('beforeEach', function beforeEachHandler(value) {
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
    if (process.env.NODE_ENV !== 'production') {
      const { payload, state } = value;
      if (Array.isArray(Store.actionListeners[payload.type])) {
        console.log('After :\t', state.toJS());
        console.groupEnd(Store.displayName);
      }
    }
  });

  Store.on('error', ({ error, payload, state }) => {
    console.error(error);
    console.error('Payload: ', payload.payload);
    console.error('State: ', state.toJS());
    console.groupEnd(Store.displayName);
  });
}

export function setMergeState(changedData) {
  let nextState = this.state.merge(changedData);
  if (this.state.equals(nextState)) {
    return null;
  }

  this.setState(nextState);
}

export function setMergeDeep(changedData) {
  let nextState = this.state.mergeDeep(changedData);
  if (this.state.equals(nextState)) {
    return null;
  }

  this.setState(nextState);
}

export function locationHref(url) {
  window.location.href = url;
}