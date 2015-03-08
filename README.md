# ngStomp

> [STOMP](http://jmesnil.net/stomp-websocket/doc/) promised for [AngularJS](https://angularjs.org)

## Installation

#### Install via Bower:
```bash
bower install --save ng-stomp
```
----
#### Install via npm:
```bash
npm install --save ng-stomp
```
----
#### Add SockJS + STOMP + (minified) Stompie:
```html
<script src="/bower_components/sockjs/sockjs.min.js"></script>
<script src="/bower_components/stomp-websocket/lib/stomp.min.js"></script>
<script src="/bower_components/stompie/stompie.min.js"></script>
```
----
#### Declare the module as a dependency in your application:
```js
angular.module('yourApp', ['ngStomp']);
```

## Usage

Inject it in your controller:
```js
angular
    .module('app')
    .controller('Ctrl', ['$stomp', '$scope', function ($stomp, $scope) {
        // ...
    }
```

## Example
Use and subscribe:
```js
// redirect debug
$stomp.setDebug(function (args) {
    document.getElementById('log').value += args + '\n';
});

$stomp
    .connect('/endpoint', connectHeaders)

    // frame = CONNECTED headers
    .then(function (frame) {

        var subscription = $stomp.subscribe('/dest', function (payload, headers, res) {
            $scope.payload = payload;
        }, {
            "headers": "are awesome"
        });

        // Unsubscribe
        subscription.unsubscribe();

        // Send message
        $stomp.send('/dest', {
            message: 'body'
        }, {
            priority: 9,
            custom: 42 //Custom Headers
        });

        // Disconnect
        $stomp.disconnect(function () {

        });
    });
```