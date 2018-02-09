/**
 * ngStomp
 *
 * @version 0.5.0
 * @author Maik Hummel <m@ikhummel.com>
 * @license MIT
 */
!function(){angular.module("ngStomp",[]).service("$stomp",["$rootScope","$q",function(a,b){this.sock=null,this.stomp=null,this.debug=null,this.setDebug=function(a){this.debug=a},this.connect=function(a,c,d,e){c=c||{},e=e||{};var f=b.defer();return this.sock=new SockJS(a,null,e),this.sock.onclose=function(){angular.isFunction(d)&&d(new Error("Connection broken"))},this.stomp=Stomp.over(this.sock),this.stomp.debug=this.debug,this.stomp.connect(c,function(a){f.resolve(a)},function(a){f.reject(a),angular.isFunction(d)&&d(a)}),f.promise},this.disconnect=function(){var a=b.defer();return this.stomp.disconnect(a.resolve),a.promise},this.subscribe=this.on=function(a,b,c){return c=c||{},this.stomp.subscribe(a,function(a){var c=null;try{c=JSON.parse(a.body)}finally{b&&b(c,a.headers,a)}},c)},this.unsubscribe=this.off=function(a){a.unsubscribe()},this.send=function(a,c,d){var e=b.defer();try{var f=JSON.stringify(c);d=d||{},this.stomp.send(a,d,f),e.resolve()}catch(a){e.reject(a)}return e.promise}}])}();