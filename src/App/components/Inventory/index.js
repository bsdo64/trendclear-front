import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import { Scrollbars } from 'react-custom-scrollbars';

const Inventory = (props) => {

  const rebuildTooltip = function (itemCode) {
    props.FireShowItemInfo(itemCode);
    ReactTooltip.rebuild();
  };

  function createTableColum(venatemId = '', c) {
    const {Venatems, Items} = props;
    const venatem = Venatems.get(venatemId.toString());
    let item;

    if (venatem && (venatem.get('item_count') > 0)) {
      const getItem = Items.get(venatem.get('item_id').toString());

      item = (
        <div
          data-tip
          data-for={'item'}
          className="content"
          onMouseOver={rebuildTooltip.bind(this, getItem.get('code'))}
        >
          <span className="item-count">{venatem.get('item_count')}</span>
          <img className="item-image" src={getItem.get('image')}/>
        </div>
      );
    } else {
      item = <div className="content"></div>;
    }

    return (
      <td key={c}>
        {item}
      </td>
    );
  }

  function createTableRow(inventory, col, row) {
    let tableRows = [];
    let r = 0;
    let itemIndex = 0;

    while (++r <= row) {
      let tableCols = [];
      let c = 0;

      while (++c <= col) {
        const listItemId = inventory.get('items').get(itemIndex);

        tableCols.push(createTableColum(listItemId, c));

        itemIndex = itemIndex + 1;
      }

      tableRows.push(
        <tr key={r}>
          {tableCols}
        </tr>
      );
    }
    return tableRows;
  }

  function createTable(inventory, colNum, rowNum) {

    return (
      <table className="inventory_table">
        <tbody>
        {
          createTableRow(inventory, colNum, rowNum)
        }
        </tbody>
      </table>
    );
  }

  const {inventory, positionStyle} = props;
  const table = createTable(inventory, 4, 8);

  const style = cx('user_inventory', {
    [positionStyle]: true,
  });

  return (
    <div key="user_inventory" className={style}>
      <h4 style={{display: 'inline-block'}}>인벤토리</h4>
      {
        positionStyle === 'drag' &&
        <span
          style={{float: 'right', cursor: 'pointer', padding: '0 5px'}}
          onClick={() => props.FireToggleShowInventory()}
        >
          <i className='fa fa-close' />
        </span>
      }
      <div className="inventory_box">
        <ul className="inventory_tap">
          <li className="active">커뮤니티</li>

        </ul>
        <Scrollbars autoHeight autoHeightMax={300} autoHeightMin={300} autoHide>
          <div className="inventory_scroll">
            {table}
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

Inventory.propTypes = {
  ShoppingStore: PropTypes.object.isRequired,
  inventory: PropTypes.object.isRequired,
  Venatems: PropTypes.object.isRequired,
  Items: PropTypes.object.isRequired,
  positionStyle: PropTypes.string.isRequired,
  FireShowItemInfo: PropTypes.func.isRequired,
  FireToggleShowInventory: PropTypes.func,
};

export default Inventory;
