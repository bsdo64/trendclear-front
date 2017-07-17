import React from 'react';
import Bundle from '../components/Bundle/index.js';

export const createLazyMod = (mod) => {
  const LazyComponent = (props) => (
    <Bundle load={mod}>
      {P => <P { ...props }/>}
    </Bundle>
  );
  return LazyComponent;
}