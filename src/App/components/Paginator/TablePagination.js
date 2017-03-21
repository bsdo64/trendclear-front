import React, {
  PropTypes,
} from 'react';
import segmentize from 'segmentize';

const Ellipsis = React.createClass({
  render() {
    return <a className="item"><i className="fa fa-ellipsis-h"></i></a>;
  },
});

const Button = React.createClass({
  propTypes: {
    onClickPage: PropTypes.func,
    page: PropTypes.number,
  },
  render() {
    return (
      <a className="item"
         onClick={this.props.onClickPage(this.props.page)}>{this.props.page}</a>
    );
  },
});

const ActiveButton = React.createClass({
  propTypes: {
    onClickPage: PropTypes.func,
    page: PropTypes.number,
  },
  render() {
    return (
      <a className="item active"
         onClick={this.props.onClickPage(this.props.page)}>{this.props.page}</a>
    );
  },
});

const TablePagination = React.createClass({
  propTypes: {
    totalPage: PropTypes.number,
    currentPage: PropTypes.number,
    pageLimit: PropTypes.number,
    onClickPage: PropTypes.func,
  },
  render() {

    const {totalPage, currentPage} = this.props;
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
             onClick={this.props.onClickPage(currentPage - 1)}>
            <i className="left chevron icon"/>
          </a>
        }

        {
          seg.beginPages.map((p, i) => {
            return <Button key={i} page={p}
                           onClickPage={this.props.onClickPage}/>;
          })
        }

        {
          sidePageCount === seg.previousPages.length &&
          <Ellipsis />
        }

        {
          seg.previousPages.map((p, i) => {
            return <Button key={i} page={p}
                           onClickPage={this.props.onClickPage}/>;
          })
        }

        {
          seg.centerPage.map((p, i) => {
            return <ActiveButton key={i} page={p}
                                 onClickPage={this.props.onClickPage}/>;
          })
        }

        {
          seg.nextPages.map((p, i) => {
            return <Button key={i} page={p}
                           onClickPage={this.props.onClickPage}/>;
          })
        }

        {
          sidePageCount === seg.nextPages.length &&
          <Ellipsis />
        }

        {
          seg.endPages.map((p, i) => {
            return <Button key={i} page={p}
                           onClickPage={this.props.onClickPage}/>;
          })
        }

        {
          totalPage !== currentPage &&
          <a className="icon item"
             onClick={this.props.onClickPage(currentPage + 1)}>
            <i className="right chevron icon"/>
          </a>
        }
      </div>
    );
  },
});

export default TablePagination;
