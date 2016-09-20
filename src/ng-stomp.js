/**
 * ngStomp
 *
 * @version 0.3.0
 * @author Maik Hummel <m@ikhummel.com>
 * @license MIT
 */
(function (root, factory) {
  'use strict'

  if (false && typeof define === 'function' && define.amd) {
    define(['angular', 'sockjs-client', 'stompjs'], factory)
  } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports = factory(require('angular'), require('sockjs-client'), require('stompjs'))
  } else {
    return factory(root.angular, root.SockJS, root.Stomp)
  }
}(window, function (angular, SockJS, Stomp) {
  'use strict'

  var moduleName = 'ngStomp'

  angular
    .module(moduleName, [])
    .service('$stomp', [
      '$rootScope', '$q',
      function ($rootScope, $q) {
        this.sock = null
        this.stomp = null
        this.debug = null

        this.setDebug = function (callback) {
          this.debug = callback
        }

        this.connect = function (endpoint, headers, errorCallback) {
          headers = headers || {}
          var dfd = $q.defer()

          this.sock = new SockJS(endpoint)
          this.stomp = Stomp.over(this.sock)
          this.stomp.debug = this.debug
          this.stomp.connect(headers, function (frame) {
            dfd.resolve(frame)
          }, function (err) {
            dfd.reject(err)
            errorCallback(err)
          })

          return dfd.promise
        }

        this.disconnect = function () {
          var dfd = $q.defer()
          this.stomp.disconnect(dfd.resolve)
          return dfd.promise
        }

        this.subscribe = this.on = function (destination, callback, headers) {
          headers = headers || {}
          return this.stomp.subscribe(destination, function (res) {
            var payload = null
            try {
              payload = JSON.parse(res.body)
            } finally {
              if (callback) {
                callback(payload, res.headers, res)
              }
            }
          }, headers)
        }

        this.unsubscribe = this.off = function (subscription) {
          subscription.unsubscribe()
        }

        this.send = function (destination, body, headers) {
          var dfd = $q.defer()
          try {
            var payloadJson = JSON.stringify(body)
            headers = headers || {}
            this.stomp.send(destination, headers, payloadJson)
            dfd.resolve()
          } catch (e) {
            dfd.reject(e)
          }
          return dfd.promise
        }
      }]
  )

  return moduleName
}))
