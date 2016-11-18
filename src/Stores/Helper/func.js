
export function initListener(Store) {
  Store.on('bootstrap', function initBootStrapListener(nextState) {

    const prevState = Store.state;
    if (!nextState.equals(prevState)) {
      Store.setState(nextState);
    }
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