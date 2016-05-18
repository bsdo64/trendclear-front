/* eslint no-console:0 */
import React from 'react';
import segmentize from 'segmentize';
import Paginator from 'react-pagify';

require('./Paginator.scss');
export default class PaginatorApp extends React.Component {
  constructor(props) {
    super(props);

    this.displayName = 'PaginatorApp';
    this.state = {
      dataLength: props.total || 0,
      pagination: {
        page: props.page || 1,
        perPage: props.limit || 10
      }
    };

    this.selectPage = this.selectPage.bind(this);
    this.onPerPage = this.onPerPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataLength: nextProps.total,
      pagination: {
        page: nextProps.page,
        perPage: nextProps.limit
      }
    })
  }

  selectPage(page) {
    const state = this.state;
    const pagination = state.pagination || {};
    const pages = Math.ceil(state.dataLength / pagination.perPage);

    pagination.page = Math.min(Math.max(page, 1), pages);
    
    this.setState({
      pagination: pagination
    });

    this.props.handleSetPage(this.state.pagination);
  }

  onPerPage(event) {
    const pagination = this.state.pagination || {};

    pagination.perPage = parseInt(event.target.value, 10);

    this.setState({
      pagination: pagination
    });
  }

  render() {
    const dataLength = this.state.dataLength || [];
    const pagination = this.state.pagination || {};
    const pages = Math.ceil(dataLength / Math.max(
        isNaN(pagination.perPage) ? 1 : pagination.perPage, 1)
    );

    return (
      <div className="pagination_box">
        <Paginator.Context
          className="ui pagination menu small"
          tags={{
          button: {
            tag: 'a'
          },
          segment: {
            tag: 'div'
          },
          ellipsis: {
            tag: 'div'
          },
          link: {
            tag: 'a'
          }
        }}
          segments={segmentize({
            page: pagination.page,
            pages: pages,
            beginPages: 1,
            endPages: 1,
            sidePages: 3
          })}
          onSelect={this.selectPage}
          ellipsis={'…'}
        >
          { /*<Paginator.Button page={pagination.page - 10} className="item">{'< 10'}</Paginator.Button>*/ }

          {
            (pagination.page > 1) &&
            <Paginator.Button page={pagination.page - 1} className="ui item left_arrow">{'<'}</Paginator.Button>
          }
          <Paginator.Segment field="beginPages" className="item"/>
          <Paginator.Ellipsis className="item disabled previousPages"
                              previousField="beginPages" nextField="previousPages">...</Paginator.Ellipsis>

          <Paginator.Segment field="previousPages" className="previous_pages"/>
          <Paginator.Segment field="centerPage" className="ui active item"/>
          <Paginator.Segment field="nextPages" className="next_pages"/>

          <Paginator.Ellipsis className="item disabled"
                              previousField="nextPages" nextField="endPages">...</Paginator.Ellipsis>

          <Paginator.Segment field="endPages" className="next_pages"/>

          {
            (pages != pagination.page) &&
            <Paginator.Button page={pagination.page + 1} className="ui item right_arrow">{'>'}</Paginator.Button>
          }
          { /*<Paginator.Button page={pagination.page + 10} className="item">{'10 >'}</Paginator.Button>*/ }
        </Paginator.Context>
      </div>
    );
  }
}
