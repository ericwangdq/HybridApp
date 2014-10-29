/* We define a global variable 'namespace' as module manager*/

/* start application*/
define(['utilities/detector'],
	function(Detector) {

	'use strict';

	var cordovaPlugin = {
    
        isCordovaAvailable: function() {
            if (Detector.isMobileUserAgent()) {
//                require(['cordova']);

//                var isCordova = false;
//                require(['cordova'], function () {
//                    //cordova is now loaded.
//                    isCordova = typeof (window.cordova || window.Cordova || window.PhoneGap) !== 'undefined';
//                });
                return typeof (window.cordova || window.Cordova || window.PhoneGap) !== 'undefined';
                //return typeof (window.cordova) !== 'undefined';
            }
            return false;

        },
        
        cordovaEvent: function(call,callback){

            // TODO ... 
            document.addEventListener(
                'pause',
                call.pause, 
                false
            );

            // TODO ...
            document.addEventListener(
                'resume',
                call.resume, 
                false
            );

            // TODO ...
            document.addEventListener(
                'online',
                call.online, 
                false
            );

            // TODO ...
            document.addEventListener(
                'offline',
                call.offline, 
                false
            );
            
            document.addEventListener(
                'backbutton',
                call.backbutton,
                false
            );
            
            document.addEventListener(
                'menubutton',
                call.menubutton, 
                false
            );
            
            callback();
        }

    }
	 
    return cordovaPlugin;
});