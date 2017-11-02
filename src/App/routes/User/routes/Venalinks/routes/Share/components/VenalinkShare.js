import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import accounting from 'accounting';
import moment from 'moment';
import TablePagination from '../../../../../../../components/Paginator/TablePagination';

class VenalinkShare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };

    this.paybackRP = this.paybackRP.bind(this);
    this.createVenalinkItem = this.createVenalinkItem.bind(this);
    this.handleClickPage = this.handleClickPage.bind(this);
    this.handleClickPage = this.handleClickPage.bind(this);

  }

  paybackRP(itemId) {
    return () => this.props.FireRequestUserPaybackRP({
      userVenalinkId: itemId,
    });
  }

  createVenalinkItem(participatedList) {
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
                 onClick={this.paybackRP(participatedList.get('id'))}
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

  handleClickPage(p) {
    return () => {
      this.props.FireRequestGetMoreShareVenalinkList({
        p: p,
      });

      this.setState({
        page: p,
      });
    };
  }

  render() {
    const {userParticipatedVenalinksPage, userParticipatedVenalinks} = this.props;
    const total = userParticipatedVenalinksPage && Math.ceil(userParticipatedVenalinksPage.get('total') / userParticipatedVenalinksPage.get('limit'));
    const limit = userParticipatedVenalinksPage && userParticipatedVenalinksPage.get('limit');
    const page = userParticipatedVenalinksPage && userParticipatedVenalinksPage.get('current_page');

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
              userParticipatedVenalinks &&
              userParticipatedVenalinks.map(this.createVenalinkItem)
            }
            </tbody>
            <tfoot>
            <tr>
              <th colSpan="10">
                <TablePagination
                  totalPage={total}
                  currentPage={page || 1}
                  pageLimit={limit}
                  onClickPage={this.handleClickPage}
                />
              </th>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

VenalinkShare.propTypes = {
  UserStore: PropTypes.object.isRequired,
  FireRequestUserPaybackRP: PropTypes.func.isRequired,
  userParticipatedVenalinksPage: PropTypes.object,
  userParticipatedVenalinks: PropTypes.object,
  FireRequestGetMoreShareVenalinkList: PropTypes.func.isRequired,
};

export default VenalinkShare;
