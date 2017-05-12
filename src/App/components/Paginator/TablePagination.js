import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import segmentize from 'segmentize';

const Ellipsis = () => (
  <a className="item"><i className="fa fa-ellipsis-h"/></a>
);

const Button = props => {
  const { onClickPage, page, isActive } = props;
  return (
    <a className={cx('item', { active: isActive })}
       onClick={onClickPage(page)}>{page}</a>
  );
};

Button.propTypes = {
  onClickPage: PropTypes.func,
  page: PropTypes.number,
  isActive: PropTypes.bool,
};

const TablePagination = props => {
  const { totalPage, currentPage } = props;
  const sidePageCount = 2;
  const seg = segmentize({
    page: currentPage,
    pages: totalPage,
    beginPages: 1,
    endPages: 1,
    sidePages: sidePageCount,
  });

  return (
    <div className="ui right floated pagination menu">
      {
        1 < currentPage &&
        <a className="icon item"
           onClick={props.onClickPage(currentPage - 1)}>
          <i className="left chevron icon"/>
        </a>
      }

      {
        seg.beginPages.map((p, i) => {
          return <Button key={i} page={p}
                         onClickPage={props.onClickPage}/>;
        })
      }

      {
        sidePageCount === seg.previousPages.length &&
        <Ellipsis />
      }

      {
        seg.previousPages.map((p, i) => {
          return <Button key={i} page={p}
                         onClickPage={props.onClickPage}/>;
        })
      }

      {
        seg.centerPage.map((p, i) => {
          return <Button key={i} page={p}
                         isActive={true}
                         onClickPage={props.onClickPage}/>;
        })
      }

      {
        seg.nextPages.map((p, i) => {
          return <Button key={i} page={p}
                         onClickPage={props.onClickPage}/>;
        })
      }

      {
        sidePageCount === seg.nextPages.length &&
        <Ellipsis />
      }

      {
        seg.endPages.map((p, i) => {
          return <Button key={i} page={p}
                         onClickPage={props.onClickPage}/>;
        })
      }

      {
        totalPage !== currentPage &&
        <a className="icon item"
           onClick={props.onClickPage(currentPage + 1)}>
          <i className="right chevron icon"/>
        </a>
      }
    </div>
  );
};

TablePagination.propTypes = {
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  pageLimit: PropTypes.number,
  onClickPage: PropTypes.func,
};

export default TablePagination;
