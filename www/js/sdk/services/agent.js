define(['jquery','json'], function($) {

    'use strict';

    var loginData = {};
    loginData["parameter_compressdata"] = false;
    loginData["parameter_postdata"] = "parameter_postdata";
    loginData["parameter_deviceid"] = "1111111";
    loginData["parameter_clienttypeid"] = "iPhone4S";
    loginData["parameter_clienidtversion"] = "iPhone4S";
    loginData["network"] = "wifi";
    loginData["os"] = "iOS";
    loginData["resolution1"] = "8";
    loginData["resolution2"] = "960.000";
    loginData["osVersion"] = "640.000";
    loginData["appcode"] = "com.baosight.iplat4mipad"; // "iplatmbs"; // core.CONSTANT

    var Agent = {
        init: function(){
            console.log("Agent init function");
        },
        login: function(loginURL, options) {
            $.support.cors = true;
            var data = {};
            data["parameter_userid"] = options.userid;
            data["parameter_password"] = options.password;

            $.extend(data, loginData);
            $.ajax({
                type : "POST",
                async : false,
                url : loginURL,
                data : data,
                dataType : "json",
                success : function(data) {
//                    cookie.set("userid","039780");
//                    cookie.set("usertokenid","0123456789abcedf");
                    options.success(data);
                },
                error : function(xmlR, status, e) {
                    options.error(e);
                }
            });

        },
        callService: function(url, data, options) {// data is eiInfo
            $.support.cors = true;

            $.ajax({
                type: "POST",
                async: false,
                url: url,
                data: {
                    "parameter_encryptdata": "false",
                    "parameter_usertokenid": '0123456789abcdef',
                    "parameter_userid": '178237',
                    "parameter_compressdata": "false",
                    "datatype":"json/eiinfo",
                    "parameter_postdata": data
                },
                dataType: "json",
                success: function (data, status, jqXHR) {
                    options.success(data);

                },
                error: function ( jqXHR, status, e ){
                    options.error(e);
                }
            });

        },
        callServlet: function(url, json, options) {
            $.support.cors = true;
            $.ajax({
                type: "POST",
                async: false,
                url: url,
                data: {
                    "parameter_encryptdata": "false",
                    "parameter_usertokenid": "0123456789abcdef",
                    "parameter_compressdata": "false",
                    "datatype":"json/json",
                    "parameter_postdata": json
                },
                dataType: "json",
                success:  function (msg) {
                    options.success(msg);
                },
                error:    function ( xmlR, status, e ){
                    options.error(xmlR, status, e);
                }
            });

        }
    };

    return Agent;

});