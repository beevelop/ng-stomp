/**
 * ngStomp
 *
 * @version 0.3.0
 * @author Maik Hummel <m@ikhummel.com>
 * @license MIT
 */

/*global
    angular, SockJS, Stomp */

angular
  .module('ngStomp', [])
  .service('$stomp', [
    '$rootScope', '$q',
    function ($rootScope, $q) {
      this.sock = null
      this.stomp = null
      this.debug = null
      this.scopedApply = false

      this.setDebug = function (callback) {
        this.debug = callback
      }

      this.setScopedApply = function (apply) {
        this.scopedApply = apply
      }

      this.connect = function (endpoint, headers, errorCallback) {
        headers = headers || {}

        var dfd = $q.defer()

        this.sock = new SockJS(endpoint)
        this.stomp = Stomp.over(this.sock)
        this.stomp.debug = this.debug
        var us = this
        this.stomp.connect(headers, function (frame) {
          dfd.resolve(frame)
        }, function (err) {
          dfd.reject(err)
          if (angular.isFunction(errorCallback)) {
            if (us.scopedApply) {
              $rootScope.$apply(function() {
                errorCallback(err)
              })
            } else {
              errorCallback(err)
            }
          }
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
        var us = this
        return this.stomp.subscribe(destination, function (res) {
          var payload = null
          try {
            payload = JSON.parse(res.body)
          } finally {
            if (angular.isFunction(callback)) {
              if (us.scopedApply) {
                $rootScope.$apply(function() {
                  callback(payload, res.headers, res)
                });
              } else {
                callback(payload, res.headers, res)
              }
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
