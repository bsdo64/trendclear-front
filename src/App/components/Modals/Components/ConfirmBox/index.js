import React from 'react';
import PropTypes from 'prop-types';

require('./index.scss');
const ConfirmBox = props => {
  function confirmPurchaseItem(item) {
    props.FireRequestPurchaseItem(item.toJS());
  }

  function togglePurchaseWindow(item) {
    props.FireToggleConfirmPurchaseItemModal({
      item,
      contentType: 'ConfirmPurchaseItem',
    });
  }

  const { ShoppingStore, UserStore } = props;
  const trendbox = UserStore.get('trendbox');
  const purchaseItem = ShoppingStore.get('purchaseItem');
  if (!purchaseItem) {
    return (
      <div/>
    );
  }

  const priceType = purchaseItem.getIn(['attribute', 'price_type']) || '';
  const canPurchase = purchaseItem.getIn(['attribute', `price_${priceType.toLowerCase()}`]) <=
    trendbox.get(priceType);

  return (
    <div className="confirm-panel">
      <div className="confirm-box">
        {
          canPurchase &&
          <div>
            {
              purchaseItem.get('title')
            }
            을(를) 구입하시겠습니까?
            <div style={{ paddingTop: 10, textAlign: 'right' }}>
              <div className="ui button primary"
                   onClick={confirmPurchaseItem.bind(this, purchaseItem)}>
                확인
              </div>
              <div className="ui button"
                   onClick={togglePurchaseWindow.bind(this, null)}>
                취소
              </div>
            </div>
          </div>
        }

        {
          !canPurchase &&
          <div >
            포인트가 부족합니다

            <div style={{ paddingTop: 10, textAlign: 'right' }}>
              <div className="ui button primary"
                   onClick={togglePurchaseWindow.bind(this, null)}>
                확인
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

ConfirmBox.propTypes = {
  ShoppingStore: PropTypes.object.isRequired,
  UserStore: PropTypes.object.isRequired,
  FireRequestPurchaseItem: PropTypes.func.isRequired,
  FireToggleConfirmPurchaseItemModal: PropTypes.func.isRequired,
};

export default ConfirmBox;
