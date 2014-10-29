/* We define a global variable 'namespace' as module manager*/
//'css!baseCss/reset', 'css!baseCss/base',  'css!jqmCss',
/* start application*/
define(['jquery','underscore', 'view', 'backbone', 'homePage', 'listingPage',
        'detailPage', 'userPage', 'codeBinding',
        'css!jqmCss', 'css!baseCss/reset', 'css!baseCss/style'],
       
	function($, _, Backbone, View, HomePage, ListingPage, DetailPage, UserPage){

	'use strict';
  
    //装载所有的view
     var allView = {
         
         homePage: HomePage,
         listingPage: ListingPage,
         detailPage: DetailPage,
         userPage: UserPage
     };

     var Render = {
         
         _VIEWROOTPATH: './plugins/',
         _fetchFlag: true,
         _currentPage: {},
         _firstPage: true,
         showPage: function(page_name, params){
          
            var viewPage = page_name + 'Page';
               
            //实例化
            if (!View[viewPage]) {

                View[viewPage] = new allView[viewPage]();

            }
           
            Render._currentPage = View[viewPage];

            console.log(viewPage);
             
            if (!Render._currentPage.el || !Render._currentPage.el.innerHTML) {
                Render._currentPage.render();
                console.log('完成对' + page_name + ' --->render方法渲染...');

            }

            if (Render._currentPage.fillData && Render._fetchFlag) {
                Render._currentPage.fillData(params);
                console.log('完成对' + page_name + ' --->fillData方法渲染...');
            }

            if (!Render._fetchFlag) {
                Render._fetchFlag = true;
            }
           // _currentPage.transition = false;   //动画效果
            document.body.appendChild(Render._currentPage.el);

            if ($.mobile) {
                //var transition={};
                //if(CordovaPlugin.isCordovaAvailable()){
                //    if(device.platform.toLowerCase()=="ios"){
                        //transition={
                        //    changeHash: false,
                        //    transition:Render._currentPage.transition || $.mobile.defaultPageTransition
                        //};
                  //  };
                //};
                //$.mobile.changePage($('#' + page_name + '-page'),transition);

                var transition = $.mobile.defaultPageTransition;
                // We don't want to slide the first page
                if (Render._firstPage) {
                    transition = 'none';
                    Render._firstPage = false;
                }

                $.mobile.pageContainer.pagecontainer('change', $('#' + page_name + '-page'), {
                    transition: transition,
                    changeHash: false,
                    reverse: false
                });
             }
        
        },
         
        showPageCompleted: function(page_name){
            
            if (Render._currentPage.el) {
                Render._currentPage.$el = $(Render._currentPage.el);
                Render._currentPage.delegateEvents();  
            }

            if (Render._currentPage.renderCompleted) {
                Render._currentPage.renderCompleted();
                console.log('完成对' + page_name + ' --->renderCompleted方法渲染...');
            }
        
        },
         
        /**
         * Get current page
         */
        currentPage: function () {
            return Render._currentPage;
        },

        /**
         * Indicate whether data should be fetched again, when this flag is set as false, current will
         * not fetch data for only one time and then set to be true.
         * @param {boolean} flag False if current view do not need to fetch data again
         */
        setFecthFlag: function (flag) {
            Render._fetchFlag = flag;
        },

        /**
         * Create a view instance by specified name
         * @param {string} view_name Name of the view
         * @example view_name 
         *      'SocialBlogView',
         *      'FooterView'
         */
       getViewInstance: function (view_name) {
           
            if (!View[view_name]) {
                var tmp_arr = view_name.match(/[A-Z][a-z]+/g);
                for (var i = 0, len = tmp_arr.length; i < len; i++) {
                    tmp_arr[i] = tmp_arr[i].toLowerCase();
                }
                try {
                    Render._loadView(Render._VIEWROOTPATH + tmp_arr.join('-') + '.js');    
                } catch(err) {
                    console.log('err is ---> ' + err);
                    console.error('view_name --> *' + view_name + '* may not be right!');
                    return null;
                }
            }

            var instance = new View[view_name]();
            instance.$el = $(instance.el);
            instance.delegateEvents();

            return instance;
        },

         
        _loadView: function(path){

             //CordovaPlugin.loadScriptSynchronously(path);
            console.log("CordovaPlugin.loadScriptSynchronously(path);");
        }
    
    }
       
    return Render;

});