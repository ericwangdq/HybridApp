/* We define a global variable 'namespace' as module manager*/

/* start Application*/
define(['jquery', 'underscore', 'backbone', 'router','cordovaPlugin','jqm'],
    function($, _, Backbone, Router, CordovaPlugin) {

        'use strict';

        var App = {
            router: null,

            init: function() {
                //App.initTesting();

                if(CordovaPlugin.isCordovaAvailable()){
                    console.log("InitOnMobile: Cordova on device ready.");
                    App.initOnMobile();
                }
                else {
                    console.log("InitOnPC: Document ready.");
                    App.initOnPC();
                }
            },

            /*PC端执行方法*/
            initOnPC: function(){
                $(document).ready(function () {
                    App.router = new Router();
                    Backbone.history.start();
                });
            },

            /*手机端执行方法*/
            initOnMobile: function(){

                document.addEventListener(
                   'deviceready',
                   App.onDeviceReady,
                   false
                );

//                $(document).ready(function () {
//                    console.log('document ready');
//                    App.onDeviceReady()
//                });
            },

            /*移动端cordova事件 phonegap加载完成执行方法*/
            onDeviceReady: function(){
                var router = new Router();
                Backbone.history.start();
            }
        };

        return App;

    });