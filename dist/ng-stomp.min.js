/**
 * ngStomp
 *
 * @version 0.2.0
 * @author Maik Hummel <m@ikhummel.com>
 * @license MIT
 */
/*global
    angular, SockJS, Stomp */
angular.module("ngStomp",[]).service("$stomp",["$rootScope","$q",function(a,b){this.sock=null,this.stomp=null,this.debug=null,this.setDebug=function(a){this.debug=a},this.connect=function(a,c){c=c||{};var d=b.defer();return this.sock=new SockJS(a),this.stomp=Stomp.over(this.sock),this.stomp.debug=this.debug,this.stomp.connect(c,function(a){d.resolve(a)},function(a){d.reject(a)}),d.promise},this.disconnect=function(){var a=b.defer();return this.stomp.disconnect(a.resolve),a.promise},this.subscribe=this.on=function(a,b,c){return c=c||{},this.stomp.subscribe(a,function(a){var c=null;try{c=JSON.parse(a.body)}finally{b&&b(c,a.headers,a)}},c)},this.unsubscribe=this.off=function(a){a.unsubscribe()},this.send=function(a,c,d){var e=b.defer();try{var f=JSON.stringify(c);d=d||{},this.stomp.send(a,d,f),e.resolve()}catch(g){e.reject(g)}return e.promise}}]);