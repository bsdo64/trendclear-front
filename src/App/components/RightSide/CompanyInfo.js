import React from 'react';
import { Link } from 'react-router-dom';

const CompanyInfo = () => {
  return (
    <div className="_45mq" role="contentinfo"
         style={{marginTop: 20, fontSize: 12}}>
      <div className="fsm fwn fcg">
        <Link to="/policies/privacy">개인정보보호</Link>
        <span role="presentation" aria-hidden="true"> · </span>
        <Link to="/policies/terms">약관</Link>
        {/*<span role="presentation" aria-hidden="true"> · </span>
         <Link to="/advertisement">광고안내</Link>*/}
        <span role="presentation" aria-hidden="true"> · </span>
        <Link to="/about">회사소개</Link>
        {/*<span role="presentation" aria-hidden="true"> · </span>
         <Link to="/careers">채용</Link>*/}
        <span role="presentation" aria-hidden="true"> · </span>
        <Link to="/help">고객센터</Link>
      </div>
      <div>
        <span> Venacle © 2016</span>
      </div>
      <div style={{color: '#b3b3b3'}}>
        <div>상호명 : 베나클</div>
        <div>대표자 : 도병수</div>
        <div>사업자 번호 : 359-19-00336</div>
        <div style={{fontSize: 11}}>주소 : 서울시 강서구 화곡동 강서로8길 174 303호</div>
        <div>전화 : 070-4130-0420</div>
      </div>
    </div>
  )
};

export default CompanyInfo;