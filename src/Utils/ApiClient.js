const request = require('superagent')
const Promise = require('bluebird')
const debug = require('debug')
const apiErrorLog = debug('vn:api:error')
const apiResultLog = debug('vn:api:result')

class AjaxApiClient {
  constructor () {
    this.EndPoint = '/ajax'
    this.r = request
  }

  catchError (e) {
    if (process.env.NODE_ENV !== 'production') {
      apiErrorLog(e)
    }
  }

  _done (resolve, reject) {
    return (xhrErr, xhrRes) => {
      if (process.env.NODE_ENV !== 'production') {
        apiErrorLog(xhrErr)
        apiResultLog(xhrRes)
      }

      if (xhrErr) {
        return reject(xhrErr)
      } else if (xhrRes.error) {
        return reject(xhrRes)
      } else {
        return resolve(xhrRes.body)
      }
    }
  }

  _normalizeParams (queryString) {
    if (typeof queryString === 'object') {
      return queryString
    }

    if (typeof queryString === 'string') {
      const normalized = queryString.split('?')
      return normalized[1]
    }

    return queryString
  }

  setEntryPoint (endPoint) {
    this.EndPoint = endPoint

    return this
  }

  get (url, params) {

    const normalizedQuery = this._normalizeParams(params)

    return new Promise((resolve, reject) => {
      return this.r
        .get(this.EndPoint + url)
        .query(normalizedQuery)
        .set('Accept', 'application/json')
        .end(this._done(resolve, reject))
    })
      .catch(this.catchError)
  }

  post (url, params) {
    return new Promise((resolve, reject) => {
      return this.r
        .post(this.EndPoint + url)
        .send(params)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject))
    })
      .catch(this.catchError)
  }

  put (url, params) {
    return new Promise((resolve, reject) => {
      return this.r
        .put(this.EndPoint + url)
        .send(params)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject))
    })
      .catch(this.catchError)

  }

  delete (url, params) {
    return new Promise((resolve, reject) => {
      return this.r
        .delete(this.EndPoint + url)
        .send(params)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject))
    })
      .catch(this.catchError)
  }

  postImg (url, file) {
    return new Promise((resolve, reject) => {
      return this.r
        .post(this.EndPoint + url)
        .attach(file.name, file, file.name)
        .set('Accept', 'application/json')
        .withCredentials()
        .end(this._done(resolve, reject))
    })
      .catch(this.catchError)
  }
}

module.exports = new AjaxApiClient()
