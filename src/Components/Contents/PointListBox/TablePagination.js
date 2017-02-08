import React, {
  PropTypes
} from 'react';
import segmentize from 'segmentize'

const Button = React.createClass({
  render() {
    return (
      <a className="item" >{this.props.page}</a>
    )
  }
});

const ActiveButton = React.createClass({
  propTypes: {
    onClickPage: PropTypes.func,
    page: PropTypes.number,
  },
  render() {
    return (
      <a className="item active" onClick={this.props.onClickPage}>{this.props.page}</a>
    );
  }
});

const TablePagination = React.createClass({
  propTypes: {
    totalPage: PropTypes.number,
    currentPage: PropTypes.number,
    pageLimit: PropTypes.number,
    onClickPage: PropTypes.func
  },
  render() {

    const { totalPage, currentPage } = this.props;
    const seg = segmentize({
      page: currentPage,
      pages: totalPage,
      beginPages: 1,
      endPages: 1,
      sidePages: 2
    });

    return (
      <div className="ui right floated pagination menu">
        <a className="icon item">
          <i className="left chevron icon"/>
        </a>

        {
          seg.beginPages.map((p, i) => {
            return <Button key={i} page={p} />
          })
        }

        {
          seg.previousPages.map((p, i) => {
            return <Button key={i} page={p} />
          })
        }

        {
          seg.centerPage.map((p, i) => {
            return <ActiveButton key={i} page={p} onClickPage={this.props.onClickPage}/>
          })
        }

        {
          seg.nextPages.map((p, i) => {
            return <Button key={i} page={p} />
          })
        }

        {
          seg.endPages.map((p, i) => {
            return <Button key={i} page={p} />
          })
        }

        <a className="icon item">
          <i className="right chevron icon"/>
        </a>
      </div>
    );
  }
});

export default TablePagination;
