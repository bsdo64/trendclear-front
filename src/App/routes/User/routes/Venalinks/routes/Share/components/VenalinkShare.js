import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import accounting from 'accounting';
import moment from 'moment';
import TablePagination from '../../../../../../../components/Paginator/TablePagination';

const VenalinkShare = props => {
  function paybackRP(itemId) {
    return () => props.FireRequestUserPaybackRP({
      userVenalinkId: itemId,
    });
  }

  function createVenalinkItem(participatedList) {
    let status,
      isTerminate,
      hasPaybackRP = participatedList.get('has_payback_rp'),
      venalink = participatedList.get('venalink');
    switch (participatedList.get('venalink').get('is_activate')) {
      case true:
        status = '활성화';
        isTerminate = false;
        break;
      case false:
        status = '종료';
        isTerminate = true;
        break;
    }

    const isActiveStyle = cx('center aligned one wide', {
      positive: !isTerminate,
      negative: isTerminate,
    });

    const canPayback = isTerminate && participatedList.get('paid_r') > 0;
    const isDisabledRow = cx({
      disabled: !(canPayback || !isTerminate) || hasPaybackRP,
    });

    return (
      <tr className={isDisabledRow} key={participatedList.get('id')}>
        <td>포스트</td>
        <td className={isActiveStyle}>{status}</td>
        <td className="center aligned">{moment(venalink.get('terminate_at'))
          .format('YY/MM/DD HH:mm:ss')}</td>
        <td className="positive right aligned">{venalink.get(
          'participants').size}</td>
        <td className="positive right aligned">{accounting.formatNumber(
          participatedList.get('count_visitor'))}</td>
        <td className="right aligned">
          {
            (!isTerminate || participatedList.get('paid_r') <= 0 ||
            hasPaybackRP) &&
            <b>{accounting.formatNumber(participatedList.get('paid_r'))}</b>
          }

          {
            isTerminate && participatedList.get('paid_r') > 0 &&
            !hasPaybackRP &&
            <div className="ui button primary tiny"
                 onClick={paybackRP(participatedList.get('id'))}
            >
              {
                accounting.formatNumber(participatedList.get('paid_r')) +
                'RP 받기'
              }
            </div>
          }

        </td>
        <td className="right aligned">{accounting.formatNumber(
          venalink.get('total_remain_r'))}</td>
      </tr>
    );
  }

  function handleClickPage() {

  }

  const {UserStore} = props;
  const participatedVenalinks = UserStore.get('participatedVenalinks');

  return (
    <div>
      <div style={{padding: 10}}>
        <h4>베나링크 참여 리스트</h4>
        <table className="ui celled table" style={{fontSize: 12}}>
          <thead>
          <tr>
            <th className="center aligned" style={{width: 60}}>타입</th>
            <th className="center aligned">상태</th>
            <th className="center aligned three wide">종료 시간</th>
            <th className="center aligned" style={{width: 70}}>참여<br />유저(명)
            </th>
            <th className="center aligned">나의 베나링크<br/>순 방문(명)</th>
            <th className="center aligned">지급(예정) RP</th>
            <th className="center aligned">남은 RP</th>
          </tr>
          </thead>
          <tbody>
          {
            participatedVenalinks &&
            participatedVenalinks.map(createVenalinkItem)
          }
          </tbody>
          <tfoot>
          <tr>
            <th colSpan="10">
              <TablePagination
                totalPage={10}
                currentPage={1}
                pageLimit={1}
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

VenalinkShare.propTypes = {
  UserStore: PropTypes.object.isRequired,
  FireRequestUserPaybackRP: PropTypes.func.isRequired,
};

export default VenalinkShare;
