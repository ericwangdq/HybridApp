/* We define a global variable 'namespace' as module manager*/

/* start application*/
define(['jquery','underscore'], 
	function($, _) {

	'use strict';

	var Utils = {
       
        pause: function(){
        
        },
        
        resume: function(){
        
        },
        
        online: function(){
        
        },
        
        offline: function(){
        
        },
        
        backbutton: function(){
            
            var activePageId = $.mobile.activePage.attr('id');
            
            if(activePageId === 'home-page'){
                
                if($('#messageMain').css('display') == 'block'){
                    
                      $('#messageMain').hide();
                
                      $('#home-page-one').show();
                
                }else{
                    
                     Utils.showConfirmDialog('是否退出程序?',function(){
                         
                            Utils.exit();
                         
                     });
                }
            
            }else{
               
                 window.history.back(); 
            }

        },
        
        menubutton: function(){
            
        
        },
        
        showConfirmDialog: function(message,onConfirm,opt){
        
            var title="";
            var buttonLabels="";
            if(opt){
                title=opt.title;
                buttonLabels=opt.buttonLabels;
            }

            if(!title){
                title="提示";
            }
            
              if(!navigator.notification){
                  if(window.confirm(message)){
                      onConfirm.call(this,true);
                  }else{
                      onConfirm.call(this,false);
                  };
              }else{
                  
              if(buttonLabels){
                    navigator.notification.confirm(
                            message,  // message
                            onConfirm,              // callback to invoke with index of button pressed
                            title,            // title
                            buttonLabels          // buttonLabels
                     );
                }else{
                    buttonLabels="取消,确定";
                    navigator.notification.confirm(
                                message,  // message
                                function(button){
                                    if(button=="确定"){
                                        onConfirm.call(this);
                                        return;
                                    }
                                    if(button==2){
                                        onConfirm.call(this);
                                        return;
                                    }
                                },               
                                title,
                                buttonLabels
                   );
                }
             } 
        
        },
        
        //弹出框
        alert : function(message,completeCallback,title,buttonLabel){
			if(navigator && navigator.notification && navigator.notification.alert){
				completeCallback = completeCallback || function(){};
				title = title || "提示";
				buttonLabel = buttonLabel || "确定";
				
				navigator.notification.alert(message,completeCallback,title,buttonLabel);
                
			}else{
				window.alert(message);
			}
		},
        
		//显示jqm-loading
		showLoading: function(){
			$.mobile.loadingMessageTextVisible = true;
			$.mobile.showPageLoadingMsg("a", "加载中..." );
		},
        
		//隐藏jqm-loading
		hideLoading: function(){
			$.mobile.hidePageLoadingMsg();
		},
        
        //退出程序
        exit: function(){
        
            navigator.app.exitApp();
        
        },
       formatDateTime : function(dateTime){
           var date = new Date();
           var currentYear = date.getFullYear();
           var currentMonth = date.getMonth();
           var currentDay = date.getDate();
           var currentHours = date.getHours();
           var currentMinutes = date.getMinutes();
           
           var otherYear = dateTime.substring(0,dateTime.indexOf ('.'));
           var otherMonth = dateTime.substring(5,dateTime.lastIndexOf ('.'));
           var otherDay = dateTime.substring(dateTime.lastIndexOf ('.')+1,dateTime.lastIndexOf ('.')+3);
           var otherHours = dateTime.substring(dateTime.indexOf (':')-2,dateTime.indexOf (':'));
           var otherMinutes = dateTime.substring(dateTime.indexOf (':') +1 ,dateTime.indexOf (':')+3);
           
           var otherYear = dateTime.substring(0,dateTime.indexOf ('.'));
           var otherMonth = dateTime.substring(5,dateTime.lastIndexOf ('.'));
           var otherDay = dateTime.substring(dateTime.lastIndexOf ('.')+1,dateTime.lastIndexOf ('.')+3);
           var otherHours = dateTime.substring(dateTime.indexOf (':')-2,dateTime.indexOf (':'));
           var otherMinutes = dateTime.substring(dateTime.indexOf (':') +1 ,dateTime.indexOf (':')+3);
           //alert(currentYear +'-'+ currentMonth +'-'+ currentDay +'\n'+  otherYear+'-'+ otherMonth+'-'+ otherDay);
           if(currentYear == otherYear && currentMonth == otherMonth && currentDay == otherDay){
           if(currentHours != otherHours){
           return Math.abs(parseInt(currentHours) - parseInt(otherHours)) + "小时前";
           }else{
           return Math.abs(parseInt(currentMinutes) - parseInt(otherMinutes)) + "分钟前";
           }
           }else{
           return otherYear +'-'+ otherMonth +'-'+ otherDay;
           }
       }
      
    }
	 
    return Utils
});