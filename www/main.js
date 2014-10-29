(function () {
    var loadingUrl = 'lib/loading',
        pluginUrl = 'lib/plugin',
        moduleUrl = 'js/module',
        config = 'js/config',
        sdkUrl='js/sdk';
    
    require.config({
        
        paths: {

            //Phonegap
            cordova: 'cordova',
            cordovaPlugin: moduleUrl +'/cordovaPlugin',

            //Libraries
            jquery: loadingUrl + '/jquery/jquery-2.1.0',
            backbone: loadingUrl + '/backbone/backbone1.12',
            underscore: loadingUrl + '/underscore/underscore1.60',
            jqm: loadingUrl + '/jmobile/jquery.mobile-1.4.4',

            //Settings
            jqmconfig: config + '/jqm.config',
            text: loadingUrl + '/require/text2.0.12',
            i18n: loadingUrl + '/require/i18n',
            css: loadingUrl + '/require/css',
            jqmCss: loadingUrl + '/jmobile/jquery.mobile-1.4.4',
            baseCss:'css',

            //SDK
            base: sdkUrl + '/base',
            components: sdkUrl + '/components',
            services: sdkUrl + '/services',
            utilities: sdkUrl + '/utilities',
            utils: sdkUrl + '/utilities/utils',
            temp: sdkUrl + '/temp', //Testing
            datePicker: sdkUrl + '/components/datepicker',
            iscroll: sdkUrl + '/components/iscroll/iscroll',

            //Plugin
            json: pluginUrl + '/json/json2',

            //Module
            router: moduleUrl + "/router",
            render: moduleUrl + "/render",
            view: moduleUrl + "/view",
            codeBinding: moduleUrl + "/codeBinding",
            //Entry
            app: 'js/app',

            //Homepage
            home: 'modules/home',
            homePage: 'modules/home/home-page',

            //Listing
            listing: 'modules/listing',
            listingPage: 'modules/listing/listing-page',

            //Detail
            detail: 'modules/detail',
            detailPage: 'modules/detail/detail-page',

            //Panel
            panel: 'modules/common/panel',
            settingPanel: 'modules/common/panel/setting-panel.html',

            //User
            user: 'modules/user',
            userPage: 'modules/user/user-page'
        },
        
        shim: {

            'underscore': {
                exports: '_'
            },

            'backbone': {
                deps: ['jquery', 'underscore'],
                exports: 'Backbone'
            }
        }
    });

    require(['jquery','app','jqmconfig'], function($, App, Jqmconfig) {
        $(function() {
            App.init();
        });
    });
    
})();
