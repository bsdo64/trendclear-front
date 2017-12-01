import React from 'react';
import { Link } from 'react-router-dom';
import s from './index.css';

const Guide = () => {
  return (
    <div className={s.widgetBox}>
      <i className="fa fa-info" style={{paddingRight: 5}}/>
      <Link to={'/guide'} style={{color: 'inherit'}}>이용 가이드</Link>
    </div>
  )
};

export default Guide;
