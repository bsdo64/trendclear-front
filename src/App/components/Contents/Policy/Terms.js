import React from 'react';
import cx from 'classnames';

const Terms = (props) => {
  const styles = {
    wrapping: cx({ 'ui segment': !props.inSigninForm })
  };

  return (
    <div className={styles.wrapping}>
      <h4 className="ui header">이용 약관</h4>
      <p><strong>제1조 (목적) </strong><br/>
        본 약관은 베나클(이하 "베나클"이라 합니다)가 제공하는 관련 제반 서비스(이하 "서비스"라 합니다)의 이용과 관련하여 베나클와
        회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로
        합니다. </p>
      <p><strong>제2조 (회원의 정의) </strong><br/>
        ① 회원이란 베나클이 제공하는 서비스에 접속하여 본 약관에 따라 베나클의 이용절차에 동의하고 베나클이 제공하는 서비스를 이용하는
        이용자를 말합니다.</p>
      <p><strong>제3조(회원 가입) </strong><br/>
        ① 회원이 되고자 하는 자는 베나클이 정한 가입 양식에 따라 회원정보를 기입하고 "동의", "확인" 등의 버튼을 누르는 방법으로
        회원 가입을 신청합니다. <br/>
        ② 베나클은 제1항과 같이 회원으로 가입할 것을 신청한 자가 다음 각 호에 해당하지 않는 한 신청한 자를 회원으로 등록합니다.
        <br/>
        <span>1. 등록 내용에 허위, 기재누락, 오기가 있는 경우</span><br/>
        <span>2. 제6조 제2항에 해당하는 회원 자격 제한 및 정지, 상실을 한 경험이 있었던 경우</span><br/>
        <span>3. 기타 회원으로 등록하는 것이 베나클의 서비스 운영 및 기술상 현저히 지장이 있다고 판단되는 경우</span><br/><br/>
        ③ 회원가입계약의 성립시기는 베나클의 승낙이 가입신청자에게 도달한 시점으로 합니다. <br/>
        ④ 회원은 제1항의 회원정보 기재 내용에 변경이 발생한 경우, 즉시 변경사항을 정정하여 기재하여야 합니다. </p>
      <p><strong>제4조 (서비스의 제공 및 변경) </strong><br/>
        ① 베나클은 회원에게 아래와 같은 서비스를 제공합니다. <br/>
        <span>1. 커뮤니티 서비스 (게시판 등)</span> <br/>
        <span>2. 채팅 서비스</span><br/>
        <span>3. 검색 서비스</span> <br/>
        <span>4. 기타 베나클이 자체 개발하거나 다른 베나클와의 협력계약 등을 통해 회원들에게 제공할 일체의 서비스</span>
        <br/>
        ② 베나클은 서비스의 내용 및 제공일자를 제7조 제2항에서 정한 방법으로 회원에게 통지하고, 제1항에 정한 서비스를 변경하여
        제공할 수 있습니다. </p>
      <p><strong>제5조 (서비스의 중단) </strong><br/>
        ① 베나클은 컴퓨터 등 정보통신설비의 보수점검•교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로
        중단할 수 있고, 새로운 서비스로의 교체, 기타 베나클이 적절하다고
        판단하는 사유에 기하여 현재 제공되는 서비스를 완전히 중단할 수 있습니다. <br/>
        ② 제1항에 의한 서비스 중단의 경우에 베나클은 제7조 제2항에서 정한 방법으로 회원에게 통지합니다. 다만, 베나클이 통제할 수
        없는 사유로 인한 서비스의 중단(시스템 관리자의 고의, 과실이 없는
        디스크 장애, 시스템 다운 등)으로 인하여 사전 통지가 불가능한 경우에는 그러하지 아니합니다. </p>
      <p><strong>제6조 (회원 탈퇴 및 자격 상실 등) </strong><br/>
        ① 회원은 베나클에 언제든지 자신의 회원 등록 말소(회원 탈퇴)를 요청할 수 있으며 베나클은 위 요청을 받은 즉시 해당 회원의
        회원 등록 말소를 위한 절차를 밟습니다. <br/>
        ② 보안, 개발 어려움 및 서비스 악용을 위해 회원 탈퇴가 이루어진 경우 회원의 정보는 일부 삭제 또는 보관될 수 있습니다.
        다만, 커뮤니티 서비스, 기타 공용 게시판 등에 등록된 게시물은 삭제되지
        않습니다. <br/>
        ③ 회원이 다음 각 호의 사유에 해당하는 경우, 베나클은 회원의 회원자격을 적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다.
        <br/>
        <span>1. 가입 신청 시에 허위 내용을 등록한 경우 </span><br/>
        <span>2. 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우 </span><br/>
        <span>3. 서비스를 이용하여 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우 </span><br/>
        ④ 베나클이 회원의 회원자격을 상실시키기로 결정한 경우에는 회원등록을 말소합니다. <br/>
        ⑤ 이용자가 본 약관에 의해서 회원 가입 후 서비스를 이용하는 도중, 연속하여 1년 동안 서비스를 이용하기 위해 로그인 기록이
        없는 경우, 베나클은 회원의 회원자격을 상실시킬 수 있습니다. </p>
      <p><strong>제7조 (회원에 대한 통지) </strong><br/>
        ① 베나클이 특정 회원에게 서비스에 관한 통지를 하는 경우 회원정보에 등록된 메일주소를 사용할 수 있습니다. <br/>
        ② 베나클이 불특정다수 회원에 대한 통지를 하는 경우 7일 이상 공지사항 게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다.
      </p>
      <p><strong>제8조 (회원의 개인정보) </strong><br/>
        ① 베나클은 회원으로 가입하는 시점에서 아이디, 이메일 주소 등의 몇 가지 필수적인 정보를 입력 받습니다.</p>
      <p><strong>제9조 (베나클의 의무) </strong><br/>
        ① 베나클은 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 본 약관이 정하는 바에 따라 지속적이고, 안정적으로
        서비스를 제공하기 위해서 노력합니다. <br/>
        ② 베나클은 회원이 안전하고 편리하게 서비스를 이용할 수 있도록 시스템을 구축하려고 노력합니다. <br/>
        ③ 베나클은 회원이 서비스를 이용함에 있어 회원에게 손해를 배상할 책임이 없습니다. </p>
      <p><strong>제10조 (회원의 ID 및 비밀번호에 대한 의무) </strong><br/>
        ① 베나클이 관계법령, "개인정보보호정책"에 의해서 그 책임을 지는 경우를 제외하고, 자신의 ID와 비밀번호에 관한 관리책임은 각
        회원에게 있습니다. <br/>
        ② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다. <br/>
        ③ 회원은 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 베나클에 통보하고 베나클의 안내가
        있는 경우에는 그에 따라야 합니다. </p>
      <p><strong>제11조 (회원의 의무) </strong><br/>
        ① 회원은 다음 각 호의 행위를 하여서는 안됩니다. <br/>
        <span>1. 회원가입신청 또는 변경시 허위내용을 등록하는 행위</span> <br/>
        <span>2. 베나클 및 제3자의 지적재산권을 침해하거나 베나클의 권리와 업무 또는 제3자의 권리와 활동를 방해하는 행위</span>
        <br/>
        <span>3. 다른 회원의 ID를 도용하는 행위</span> <br/>
        <span>4. 관련 법령에 의하여 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램 등)의 게시 또는 전송하는 행위</span>
        <br/>
        <span>5. 베나클의 직원 또는 서비스의 관리자를 가장하거나 타인의 명의를 도용하여 정보를 게시, 전송하는 행위</span>
        <br/>
        <span>6. 컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해, 파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드, 파일, 프로그램을 <br/>
  포함하고 있는 자료를 게시하거나 전송하는 행위 </span><br/>
        <span>7. 스토킹(stalking) 등 다른 회원을 괴롭히는 행위 </span><br/>
        <span>8. 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위</span> <br/>
        <span>9. 불특정 다수의 자를 대상으로 하여 광고 또는 선전을 게시하거나 음란물을 게시하는 행위</span> <br/>
        <span>10. 베나클이 제공하는 게시판 및 관련 서비스에 게시된 공지사항 규정을 위반하는 행위</span> <br/>
        <span>11. 서버나 회선에 무리를 줄 수 있는 행위</span><br/>
        <span>12. 중복 아이디 계정을 만드는 행위</span><br/>
        ② 제1항에 해당하는 행위를 한 회원이 있을 경우 베나클은 본 약관 제6조 제2, 3항에서 정한 바에 따라 회원의 회원자격을
        적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다. <br/>
        ③ 회원은 그 귀책사유로 인하여 베나클나 다른 회원이 입은 손해를 배상할 책임이 있습니다. <br/>
      </p>
      <p><strong>제12조(공개게시물의 삭제) </strong><br/>
        ① 회원의 공개게시물의 내용이 다음 각 호에 해당하는 경우 베나클은 회원에게 사전 통지 없이 해당 공개게시물을 삭제 또는 변경할
        수 있고, 해당 회원의 회원 자격을 제한, 정지 또는 상실시킬 수
        있습니다. <br/>
        1. 다른 회원 또는 제3자를 비방하거나 중상 모략으로 명예를 손상시키는 내용 <br/>
        2. 공서양속에 위반되는 내용의 정보, 문장, 도형 등을 유포하는 내용 <br/>
        3. 범죄행위와 관련이 있다고 판단되는 내용 <br/>
        4. 다른 회원 또는 제3자의 저작권 등 기타 권리를 침해하는 내용 <br/>
        5. 종교적, 정치적 분쟁을 야기하는 내용으로서, 이러한 분쟁으로 인하여 베나클의 업무가 방해되거나 방해되리라고 판단되는 경우
        <br/>
        6. 그 외 베나클 게시물 운영 정책 및 관련법에 위반된다고 판단되는 내용<br/>
        7. 타사이트나 서비스의 직접 또는 간접적인 홍보를 하는 경우 <br/>
        ② 회원의 공개게시물로 인한 법률상 이익 침해를 근거로, 다른 회원 또는 제3자가 회원 또는 베나클를 대상으로 하여 민형사상의
        법적 조치(예:고소, 가처분신청, 손해배상청구소송)를 취하는 동시에 법적
        조치와 관련된 게시물의 삭제를 요청해오는 경우, 베나클은 동 법적 조치의 결과(예: 검찰의 기소, 법원의 가처분결정,
        손해배상판결)가 있을 때까지 관련 게시물에 대한 접근을 잠정적으로 제한할 수
        있습니다. <br/>
        ③ 베나클은 서비스 악용 방지를 위해 일부 게시물에 대해 수정 및 삭제 가능 여부를 제한할 수 있습니다. <br/>
      </p>
      <p><strong>제13조 (저작권의 귀속 및 게시물의 이용) </strong><br/>
        ① 베나클이 작성한 저작물에 대한 저작권, 기타 지적재산권은 베나클에 귀속합니다. <br/>
        ② 회원은 베나클이 제공하는 서비스를 이용함으로써 얻은 정보를 베나클의 사전승낙 없이 복제, 전송, 출판, 배포, 방송, 기타
        방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는
        안됩니다. <br/>
        ③ 회원이 서비스 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 단, 베나클은 서비스의 운영, 전시, 전송, 배포,
        홍보의 목적으로 회원의 별도의 허락 없이 무상으로 저작권법에 규정하는
        공정한 관행에 합치되게 합리적인 범위 내에서 다음과 같이 회원이 등록한 게시물을 사용할 수 있습니다. <br/>
        <span>1. 서비스 내에서 회원 게시물의 복제, 수정, 개조, 전시, 전송, 배포 및 저작물성을 해치지 않는 범위 내에서의 편집 저작물 작성</span>
        <br/>
        <span>2. 미디어, 통신사 등 서비스 제휴 파트너에게 회원의 게시물 내용을 제공, 전시 혹은 홍보하게 하는 것. 단, 이 경우 베나클은 별도의 동의 없이 회원의 이용자ID/닉네임 및 관련 IP 외에 회원의 개인정보를 제공하지 않습니다.</span>
        <br/>
        <span>3. 베나클은 전항 이외의 방법으로 회원의 게시물을 이용하고자 하는 경우, 전화, 팩스, 전자우편 등의 방법을 통해 사전에 회원의 동의를 얻어야 합니다.</span>
        <br/>
        <span>4. 베나클은 법적인 제한이 있는 글이 아니라면 사용자의 게시물을 삭제할 의무가 없습니다. </span></p>
      <p><strong>제14조(광고게재 및 광고주와의 거래) </strong><br/>
        ① 베나클이 회원에게 서비스를 제공할 수 있는 서비스 투자기반의 일부는 광고게재를 통한 수익으로부터 나옵니다. 회원은 회원이
        등록한 게시물의 내용을 활용한 광고게재 및 기타 서비스상에 노출되는
        광고게재에 대해 동의합니다. <br/>
        ② 베나클은 서비스상에 게재되어 있거나 서비스를 통한 광고주의 판촉활동에 회원이 참여하거나 교신 또는 거래를 함으로써 발생하는
        손실과 손해에 대해 책임을 지지 않습니다 </p>
      <p><strong>제15조 (약관의 개정) </strong><br/>
        ① 베나클은 약관의규제등에관한법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에관한법률 등 관련법을 위배하지 않는 범위에서
        본 약관을 개정할 수 있습니다. <br/>
        ② 다만, 개정 내용이 회원에게 불리할 경우에는 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. <br/>
        ③ 회원은 변경된 약관에 대해 거부할 권리가 있습니다. 회원은 변경된 약관이 공지된 후 7일 이내에 거부의사를 표명할 수
        있습니다. 회원이 거부하는 경우 베나클은 당해 회원과의 계약을 해지할 수
        있습니다. 만약 회원이 변경된 약관이 공지된 후 7일 이내에 거부의사를 표시하지 않는 경우에는 동의하는 것으로 간주합니다.
      </p>
      <p><strong>제16조 (재판관할) </strong><br/>
        베나클와 회원간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국 법을 적용하며, 본 분쟁으로 인한 소는 민사소송법상의 관할을
        가지는 대한민국의 법원에 제기합니다. <br/>
      </p>
      <p><strong>부칙 (2016년 1월 1일 공고) </strong><br/>
        본 약관은 2016년 1월 1일부터 적용됩니다.</p>
    </div>
  );
};

Terms.propTypes = {
  inSigninForm: React.PropTypes.bool
};

export default Terms;
