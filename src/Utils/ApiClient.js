/**
 * Created by dobyeongsu on 2015. 10. 23..
 */
import request from 'superagent';
import Promise from 'bluebird';

class AjaxApiClient {
  constructor() {
    this.ajaxEndPoint = '/ajax';
  }

  _done(resolve, reject) {
    return (xhrErr, xhrRes) => {
      if (xhrErr) {
        reject(xhrErr);
      } else if (xhrRes.error) {
        reject(xhrRes);
      } else {
        resolve(xhrRes.body);
      }
    };
  }

  get(url, params) {
    return new Promise((resolve, reject) => {
      return request
        .get(this.ajaxEndPoint + url)
        .query(params)
        .set('Accept', 'application/json')
        .end(this._done(resolve, reject));
    });
  }

  post(url, params) {
    return new Promise((resolve, reject) => {
      return request
        .post(this.ajaxEndPoint + url)
        .send(params)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject));
    });
  }
}

export default new AjaxApiClient();
