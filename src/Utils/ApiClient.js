/**
 * Created by dobyeongsu on 2015. 10. 23..
 */
const request = require('superagent');
const Promise = require('bluebird');

class AjaxApiClient {
  constructor() {
    this.EndPoint = '/ajax';
    this.r = request;
  }

  _done(resolve, reject) {
    return (xhrErr, xhrRes) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('error : ', xhrErr);
        console.log('result : ', xhrRes);
      }

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
      return this.r
        .get(this.EndPoint + url)
        .query(params)
        .set('Accept', 'application/json')
        .end(this._done(resolve, reject));
    });
  }

  post(url, params) {
    return new Promise((resolve, reject) => {
      return this.r
        .post(this.EndPoint + url)
        .send(params)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject));
    });
  }

  put(url, params) {
    return new Promise((resolve, reject) => {
      return this.r
        .put(this.EndPoint + url)
        .send(params)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject));
    });
  }

  delete(url, params) {
    return new Promise((resolve, reject) => {
      return this.r
        .delete(this.EndPoint + url)
        .send(params)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject));
    });
  }
  
  postImg(url, file) {
    return new Promise((resolve, reject) => {
      return this.r
        .post(this.EndPoint + url)
        .attach(file.name, file, file.name)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject));
    });
  }
}

module.exports = new AjaxApiClient();
