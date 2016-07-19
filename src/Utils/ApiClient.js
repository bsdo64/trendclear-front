/**
 * Created by dobyeongsu on 2015. 10. 23..
 */
import request from 'superagent';
import Promise from 'bluebird';

class AjaxApiClient {
  constructor() {
    this.EndPoint = '/ajax';
  }

  _done(resolve, reject) {
    return (xhrErr, xhrRes) => {
      if (xhrErr) {
        return reject(xhrErr);
      } else if (xhrRes.error) {
        return reject(xhrRes);
      } else {
        return resolve(xhrRes.body);
      }
    };
  }

  setEntryPoint(endPoint) {
    this.EndPoint = endPoint;

    return this;
  }

  get(url, params) {
    return new Promise((resolve, reject) => {
      return request
        .get(this.EndPoint + url)
        .query(params)
        .set('Accept', 'application/json')
        .end(this._done(resolve, reject));
    });
  }

  post(url, params) {
    return new Promise((resolve, reject) => {
      return request
        .post(this.EndPoint + url)
        .send(params)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject));
    });
  }

  put(url, params) {
    return new Promise((resolve, reject) => {
      return request
        .put(this.EndPoint + url)
        .send(params)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject));
    });
  }
  
  postImg(url, file) {
    return new Promise((resolve, reject) => {
      return request
        .post(this.EndPoint + url)
        .attach(file.name, file, file.name)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject));
    });
  }
}

export default new AjaxApiClient();
