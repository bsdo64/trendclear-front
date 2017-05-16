import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import { getPaymentInfo } from '../../Selectors/User';

import s from './index.css';
const TooltipContainer = (props) => {
  const { ShoppingStore, paymentItem } = props;
  const filterTooltipItem = ShoppingStore
    .get('items')
    .filter(item => item.get('code') === ShoppingStore.get('tooltipItemCode'))
    .get(0);

  return (
    <div>
      <ReactTooltip
        id="item"
        effect="solid"
        place="bottom"
      >
        {
          ShoppingStore.get('tooltipItemCode') && filterTooltipItem &&
          <div>
            <div className="ui horizontal list">
              <div className="item">
                <div className={cx(['ui mini image border', s.itemImage])}>
                  <img src={filterTooltipItem.get('image')}/>
                </div>
                <div className="content">
                  <div className="ui sub header"
                       style={{fontSize: 12, color: '#fff'}}
                  >
                    {filterTooltipItem.get('title')}
                  </div>
                  <div className="meta level">레벨
                    : {filterTooltipItem.get('attribute')
                      .get('available_level')}</div>
                  <div className="meta cooltime">쿨타임
                    : {filterTooltipItem.get('attribute')
                      .get('cooltime_sec')} 초
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {filterTooltipItem.get('attribute').get('description')}
          </div>
        }

        {
          ShoppingStore.get('tooltipItemCode') === null &&
          <div>
            <div className="ui active inverted dimmer">
              <div className="ui text loader">Loading</div>
            </div>
          </div>
        }
      </ReactTooltip>

      <ReactTooltip
        id="vbankinfo"
        effect="solid"
        place="bottom"
      >
        {
          paymentItem &&
          <div>
            <div className="sub header">아래 계좌로 입금 해주세요</div>
            <div className="ui divider"/>
            <p>결제 종류 : {paymentItem.get('pay_method')}</p>
            <p>입금 은행: {paymentItem.get('vbank_name')}</p>
            <p>입금 게좌번호: {paymentItem.get('vbank_num')}</p>
            <p>입금 금액: {paymentItem.get('amount')}</p>
          </div>
        }
      </ReactTooltip>
    </div>
  )
};

TooltipContainer.propTypes = {
  ShoppingStore: PropTypes.object,
  paymentItem: PropTypes.object,
};
TooltipContainer.defaultProps = {};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    ShoppingStore: getUIState('Shopping'),
    paymentItem: getPaymentInfo(StoreState),
  };
};

export default connect(
  mapStateToProps,
  {

  }
)(TooltipContainer);
