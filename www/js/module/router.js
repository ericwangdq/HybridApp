/* We define a global variable 'namespace' as module manager*/

/* start application*/
define(['jquery','underscore', 'backbone', 'utils', 'render'],
       
	function($, _, Backbone,  Utils, Render) {

	'use strict';

     var Router = Backbone.Router.extend({
         
        initialize:function(){
            
             //创建数据库
             //if (window.openDatabase) {
             //    persistence.store.websql.config(persistence, 'vanguard',
             //       'My SQLite database', 5 * 1024 * 1024);
             //}

            $(document).on('click', 'a.back', function (event) {
                window.history.back();
                event.preventDefault();
            });

//            $('.back').bind('click', function(event) {
//                window.history.back();
//                event.preventDefault();
//            });

        },
         
        routes: {
            'page/:page_name(/)(*params)': 'renderPage' 
        },


        /**
         * Show page content
         */
        renderPage: function (page_name, params_str, Model) {

            var params = params_str ? params_str.split('/') : [];
            
            Render.showPage(page_name, params);
         
            Render.showPageCompleted(page_name);
           
        }   
         
    });
        
    return Router;
        
});