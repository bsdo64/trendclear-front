import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import Transition from 'react-addons-css-transition-group';

const rebuildTooltip = function rebuildTooltip(itemCode) {
  this.props.FireShowItemInfo(itemCode);
  ReactTooltip.rebuild();
};

const Inventory = React.createClass({
  propTypes: {
    ShoppingStore: PropTypes.object.isRequired,
    inventory: PropTypes.object.isRequired,
    FireShowItemInfo: PropTypes.func.isRequired,
  },

  createTableColum(listItem, c) {
    let item;
    if (listItem && (listItem.get('item_count') > 0)) {
      item = (
        <div
          data-tip
          data-for={'item'}
          className="content"
          onMouseOver={rebuildTooltip.bind(this, listItem.get('item').get('code'))}
        >
          <span className="item-count">{listItem.get('item_count')}</span>
          <img className="item-image" src={listItem.get('item').get('image')}/>
        </div>
      )
    } else {
      item = <div className="content"></div>
    }

    return (
      <td key={c}>
        {item}
      </td>
    )
  },
  createTableRow(inventory, col, row) {
    let tableRows = [];
    let r = 0;
    let itemIndex = 0;

    while (++r <= row) {
      let tableCols = [];
      let c = 0;

      while (++c <= col) {
        const listItem = inventory.get('items').get(itemIndex);

        tableCols.push(this.createTableColum(listItem, c));

        itemIndex = itemIndex + 1;
      }

      tableRows.push(
        <tr key={r}>
          {tableCols}
        </tr>
      );
    }
    return tableRows;
  },
  createTable(inventory, colNum, rowNum) {

    return (
      <table className="inventory_table">
        <tbody>
        {
          this.createTableRow(inventory, colNum, rowNum)
        }
        </tbody>
      </table>
    );
  },
  render() {

    const { inventory } = this.props;
    const table = this.createTable(inventory, 4, 8);

    return (
      <Transition
        transitionName="react-draggable"
        transitionEnter={200}
        transitionLeave={200}
        >
        <div key="user_inventory" className="user_inventory"
             style={{
               background: '#fff',
               border: '1px solid #eee',
               width: 202
             }}
        >
          <h4>인벤토리</h4>
          <div className="inventory_box">
            <ul className="inventory_tap">
              <li className="active">커뮤니티</li>
              <li>뱃지</li>
              <li>이모티콘</li>
            </ul>
            <div className="inventory_scroll">
              {
                table
              }
            </div>

          </div>
        </div>
      </Transition>
    );
  }
});

export default Inventory;
