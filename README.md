# ngStomp

> [STOMP](http://jmesnil.net/stomp-websocket/doc/) promised for [AngularJS](https://angularjs.org)

## Installation

### Install via Bower:
```bash
bower install --save ng-stomp
```
---
### Install via npm:
```bash
npm install --save ng-stomp
```
---
Add SockJS + STOMP + (minified) Stompie:
```html
<script src="/bower_components/sockjs/sockjs.min.js"></script>
<script src="/bower_components/stomp-websocket/lib/stomp.min.js"></script>
<script src="/bower_components/stompie/stompie.min.js"></script>
```

Declare the module as a dependency in your application:
```js
angular.module('yourApp', ['ngStomp']);
```

## Usage

Inject it in your controller:
```js
angular
    .module('yourApp')
    .controller('YourCtrl', ['$stomp', '$scope', function ($stomp, $scope) {
        // ...
    }
```

Use and subscribe:
```js
//frame = CONNECTED headers
$stompie.using('/endpoint', function (frame) {
    // The $scope bindings are updated for you so no need to $scope.$apply.
    // The subscription object is returned by the method.
    var subscription = $stompie.subscribe('/your/topic', function (data) {
        $scope.foo = data;
    });

    // Unsubscribe using said subscription object.
    subscription.unsubscribe();

    // Send messages to a STOMP broker.
    $stompie.send('/some/queue', {
        message: 'some message'
    }, {
        priority: 9,
        custom: 42 //Custom Headers
    });

    // Disconnect from the socket.
    $stompie.disconnect(function () {
        // Called once you're out...
    });
});
```