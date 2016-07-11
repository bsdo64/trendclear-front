/* eslint no-console:0 */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import segmentize from 'segmentize';
import Paginator from 'react-pagify';

require('./Paginator.scss');
const PaginatorApp = React.createClass({
  displayName: 'PaginatorApp',
  mixins: [PureRenderMixin],

  selectPage(newPage) {
    const {page, limit, total } = this.props;
    const pagination = {
      page: page || 1,
      perPage: limit || 10
    };
    const dataLength = total || 0;

    const pages = Math.ceil(dataLength / pagination.perPage);

    pagination.page = Math.min(Math.max(newPage, 1), pages);

    this.props.handleSetPage(pagination);
  },

  render() {
    const {page, limit, total } = this.props;
    const pagination = {
      page: page || 1,
      perPage: limit || 10
    };
    const dataLength = total || 0;
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
            <Paginator.Button page={pagination.page - 1}>
              <div className="ui item left_arrow">{'<'}</div>
            </Paginator.Button>
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
            <Paginator.Button page={pagination.page + 1}>
              <div className="ui item right_arrow">{'>'}</div>
            </Paginator.Button>
          }
          { /*<Paginator.Button page={pagination.page + 10} className="item">{'10 >'}</Paginator.Button>*/ }
        </Paginator.Context>
      </div>
    );
  }
});

export default PaginatorApp;
