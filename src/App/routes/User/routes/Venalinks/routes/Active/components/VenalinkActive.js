import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import account from 'accounting';
import moment from 'moment';
import TablePagination from '../../../../../../../components/Paginator/TablePagination';

const VenalinkActive = props => {
  function createVenalinkItem(venalink) {

    let status, positive;
    switch (venalink.get('is_activate')) {
      case true:
        status = '활성';
        positive = 1;
        break;
      case false:
        status = '종료';
        positive = 0;
        break;
    }

    const statusStyle = cx('center aligned', {
      positive: positive,
      negative: !positive,
    });

    return (
      <tr key={venalink.get('id')}>
        <td className="center aligned">포스트</td>
        <td className={statusStyle}>{status}</td>
        <td className="center aligned">{moment(venalink.get('active_at'))
          .format('YY/MM/DD HH:mm:ss')}</td>
        <td className="center aligned">{moment(venalink.get('terminate_at'))
          .format('YY/MM/DD HH:mm:ss')}</td>
        <td className="positive right aligned">{venalink.get(
          'participants').size}</td>
        <td className="right aligned ">{account.formatNumber(
          venalink.get('total_amount_r'))}</td>
        <td className="right aligned">{venalink.get('pay_per_click_r')}</td>
        <td className="positive right aligned">{venalink.get('total_pay_r') /
        venalink.get('pay_per_click_r')}</td>
        <td className="right aligned">{account.formatNumber(
          venalink.get('total_pay_r'))}</td>
        <td className="right aligned">{account.formatNumber(
          venalink.get('total_remain_r'))}</td>
      </tr>
    );
  }

  function handleClickPage() {

  }

  const {UserStore} = props;
  const venalinks = UserStore.get('venalinks');

  return (
    <div>

      <div style={{padding: 10}}>
        <h4>베나링크 활성화 리스트</h4>
        <table className="ui celled table" style={{fontSize: 12}}>
          <thead>
          <tr>
            <th className="center aligned" style={{width: 60}}>타입</th>
            <th className="center aligned one wide">상태</th>
            <th className="center aligned" style={{width: 82}}>활성화<br />시간
            </th>
            <th className="center aligned" style={{width: 82}}>종료 시간</th>
            <th className="center aligned" style={{width: 70}}>참여<br />유저(명)
            </th>
            <th className="center aligned">활성 RP</th>
            <th className="center aligned" style={{width: 70}}>방문당<br/>지급 RP
            </th>
            <th className="center aligned">순 방문<br/>(명)</th>
            <th className="center aligned">총 지급 RP</th>
            <th className="center aligned">남은 RP</th>
          </tr>
          </thead>
          <tbody>
          {
            venalinks &&
            venalinks.map(createVenalinkItem)
          }
          </tbody>
          <tfoot>
          <tr>
            <th colSpan="10">
              <TablePagination
                totalPage={10}
                currentPage={1}
                pageLimit={10}
                onClickPage={handleClickPage}
              />
            </th>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

VenalinkActive.propTypes = {
  UserStore: PropTypes.object.isRequired,
};

export default VenalinkActive;
