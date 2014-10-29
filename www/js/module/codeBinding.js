/**
 * Created by Eric on 9/25/2014.
 */
define(['jquery', 'services/agent', 'utilities/local', 'utilities/html2canvas'],
       function($, Agent, Local){
    'use strict';

    var ctx, color = "red";
    var genericScroll;

    $(function () {

        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

        $(document).on("pageinit", "#home-page", function() {
            /* * * * * * * *
             *
             * Use this for high compatibility (iDevice + Android)
             *
             */
            //document.addEventListener('DOMContentLoaded', function () { setTimeout(HomeScroll, 200); }, false);
            $.mobile.loading('show');
            LoadScript();
        });

        $(document).on("pageshow", "#home-page", function () {
            setTimeout(function () {
                mapInit();
            },500);

            setTimeout(function () {
                $.mobile.loading('hide');
            },1000);

            $(document).on("change", "#type", function () {
                if($(this).val()=="3"){
                    window.location.href = "#page/listing";
                }
                else{
                    mapInit();
                }
            });
        });

        $(document).on("pagebeforeshow", "#home-page", function () {

        });

        $(document).on("pageshow", "[data-role=page]", function () {
            if($('.generic-wrapper').length > 0) {
                setTimeout(function () {
                    GenericScroll();
                }, 0);
            }

            if($('#canvas-content').length > 0) {

                $("div.palette.red").css("border-color", "#fff");
                $("div.palette.red").css("border-style", "dashed");

                var canvasCont = $('#canvas-content');

                $(document).on("vclick", "div.page-footer a.tag", function () {
                    if(canvasCont.hasClass("draw"))
                    {
                        $("#canvas").remove();
                        $(this).text("画图");
                        $("#canvas-content").height(0);
                        $("#canvas-content").html("");
                        $("#canvas-content").removeClass("draw");
                        genericScroll.enable();
                        //genericScroll.goToPage(0, 0, 1000);
                    }
                    else{

                        $("#canvas-content").addClass("draw");
                        genericScroll.disable();
                        $(this).text("清除");
                        newCanvas();
                    }
                });

                // reset palette selection (css) and select the clicked color for canvas strokeStyle
                $(document).on("vclick", "div.palette", function(){
                    $("div.palette").css("border-color", "#777");
                    $("div.palette").css("border-style", "solid");
                    $(this).css("border-color", "#fff");
                    $(this).css("border-style", "dashed");
                    color = $(this).css("background-color");
                    ctx.beginPath();
                    ctx.strokeStyle = color;
                });

                $(document).on("vclick", "div.page-footer a.save", function () {

                    html2canvas(document.body).then(function(canvas) {

//                        document.body.appendChild(canvas);
                        var canvasData = canvas.toDataURL();
                        var image = new Image();
                        image.src = canvas.toDataURL("image/png");
                        image.style["width"] = "100%";
//                        document.body.appendChild(image);
                        Local.set('image-data', canvasData);
                        $("#canvas").remove();
                        $("div.page-footer a.tag").text("画图");
                        $("#canvas-content").height(0);
                        $("#canvas-content").html("");
                        $("#canvas-content").removeClass("draw");
                        genericScroll.enable();
                    });

                    //alert("画图文件保存成功！");

                });
            }

        });

        $(document).on("pagebeforeshow", "#listing-page", function () {

            $("#product-listing").empty();
            $.mobile.loading('show');

            /*Test web service, data type: json*/
//            var url = "http://202.101.47.84/iPlatMBS/AgentService",
            var url = "http://localhost:8080/ProxyService/AgentService",
            json = {
                data: {
                },
                attr: {
                    projectName: "poclisting",
                    serviceName: "",
                    methodName: "",
                    requestType: "get"
                }
            };

            Agent.callServlet(url,JSON.stringify(json),{
                success: function(response) {
                    if(response != null){
                        var responseData = response.data;
                        if(typeof (response.status) != undefined && response.status == "1"){
                            $.each(responseData.product1, function(index, row){
                                var model = row.model == 0 ? "" : row.model;
                                $("#product-listing").append("<li><a href=\"#page/detail?" + row.code + "\">"
                                    + row.name + " " + model +"</a></li>");
                            });
                        }
                        else
                        {
//                            error messages
                            $("#product-listing").append("<li><a href=\"\">数据加载失败，请稍后再试！</a></li>");
                        }
                    }
                    else
                    {
//                            error messages
                        $("#product-listing").append("<li><a href=\"\">数据加载失败，请稍后再试！</a></li>");
                    }

                    //$("#product-listing").html(JSON.stringify(response));
                    $("#product-listing").listview("refresh");
                    $.mobile.loading('hide');
                },
                error: function(xmlHttpRequest, textStatus){
                    var result = eval("("+xmlHttpRequest.responseText+")");
                    $("#product-listing").append("<li><a class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\" href=\"\">" +
                        "数据加载失败，请稍后再试！+“错误信息： ” +result.exception.message </a></li>");
                }
            });

        });

        $(document).on("pagebeforeshow", "#user-page", function () {

            /*Test login service*/

           //$("#login-cont").hide();

            //var loginURL = "http://localhost:8080/ProxyService/LoginService",
            var loginURL = "http://202.101.47.84/iPlatMBS/LoginService",
                loginOptions = {
                    userid: $("#userid-input").val(),
                    password: $("#password-input").val(),
                    success: function(data) {

//                mappedUserId: "039780"
//                parameter_encyptkey: "baJueR87cH0UxA6W"
//                parameter_encyptvector: "T371D5OA1F4aTGPI"
//                parameter_userid: "039780"
//                parameter_username: "谢立群"
//                parameter_usertokenid: "1411551485114"

                        console.log(data);
                        var mappedUserId = data.attr.mappedUserId,
                            userid = data.attr.parameter_userid,
                            username = data.attr.parameter_username,
                            usertokenid = data.attr.parameter_usertokenid,
                            encyptkey = data.attr.parameter_encyptkey,
                            encyptvector = data.attr.parameter_encyptvector;
                        $("#userid").html(userid);
                        $("#username").html(username);
                        $("#usertoken").html(usertokenid);

                    },
                    error: function(e) {
                        console.log(e);
//                $("#error").html("Error:" + e );
                    }
                };

            $("#login").click(function(e) {
                loginOptions.userid = $("#userid-input").val();
                loginOptions.password = $("#password-input").val();

                Agent.login(loginURL, loginOptions);
            })

        });

    });

    function GenericScroll() {
        //清除所占的内存空间
        if (genericScroll != null) {
            genericScroll.destroy();
        }

        genericScroll = new IScroll('.generic-wrapper', {
            useTransition: false,    //默认为false
            scrollbars: true,
            mouseWheel: true,
            disableMouse: false,
            disablePointer: false,
            disableTouch: false,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true,
            preventDefault: false
        });

        //alert('GenericScroll loaded');
    }

    var mapObj;
//    var Longitude = 121.45713;
//    var Latitude = 31.232582;
    var Longitude = 113.642578,
        Latitude = 34.759666;

    function GetCurrentPosition() {
        navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError);
    }

    var onPositionSuccess = function (position) {
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;
        //alert("latitude:" + position.coords.latitude + "  Longitude:"+position.coords.longitude);
        LoadScript();
        //alert('Latitude: ' + position.coords.latitude + '\n' +
        //      'Longitude: ' + position.coords.longitude + '\n' +
        //      'Altitude: ' + position.coords.altitude + '\n' +
        //      'Accuracy: ' + position.coords.accuracy + '\n' +
        //      'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        //      'Heading: ' + position.coords.heading + '\n' +
        //      'Speed: ' + position.coords.speed + '\n' +
        //      'Timestamp: ' + position.timestamp + '\n');
    };

// onError Callback receives a PositionError object
    function onPositionError(error) {
        navigator.notification.alert(
                '获取当前位置失败，代码: ' + error.code + '\n' +
                '消息: ' + error.message + '\n', // message
            alertDismissed, // callback
            '提示', // title
            '确定' // buttonName
        );
    }

    function en_map() {
        mapObj.setLang("en");
    }
    function zh_en_map() {
        mapObj.setLang("zh_en");
    }
    function zh_map() {
        mapObj.setLang("zh_en");
    }
//添加点标记覆盖物，点的位置在地图上分布不均
    function addOverlays() {
        mapObj.clearMap();
        //地图上添加三个点标记，作为参照
        //B01 2102BS01 上海 本公司仓库 上海市宝山区月罗路1888号 121.364872,31.41536
       var marker1 = new AMap.Marker({
            icon: "http://webapi.amap.com/images/1.png",
            position: new AMap.LngLat(121.364872, 31.41536),
            offset: new AMap.Pixel(-12, -36)
        });

        //W04 2013NJ01 江苏  南京捷顺达仓库 南京市浦口区浦泗路17号 118.675947,32.164388
       var marker2 = new AMap.Marker({
            icon: "http://webapi.amap.com/images/2.png",
            position: new AMap.LngLat(118.675947, 32.164388),
            offset: new AMap.Pixel(-12, -36)
        });

        //C04 2115EH02 湖北 武汉宝钢制罐 武汉市汉阳经济技术开发区江城大道545号 114.191937,30.480162
        var marker3 = new AMap.Marker({
            icon: "http://webapi.amap.com/images/3.png",
            position: new AMap.LngLat(114.191937, 30.480162),
            offset: new AMap.Pixel(-12, -36)
        });

        //W07 2123JN01 山东 青岛仓库 山东青岛市崂山区九水东路636号 120.52444,36.150992
        var marker4 = new AMap.Marker({
            icon: "http://webapi.amap.com/images/4.png",
            position: new AMap.LngLat(120.52444, 36.150992),
            offset: new AMap.Pixel(-12, -36)
        });

        //C03 2107FS02 广东 佛山宝钢制罐 佛山市顺德高新区（容桂）建业中路18号  113.338169,22.773145
        var marker5 = new AMap.Marker({
            icon: "http://webapi.amap.com/images/5.png",
            position: new AMap.LngLat(113.338169, 22.773145),
            offset: new AMap.Pixel(-12, -36)
        });
        marker1.setMap(mapObj);
        marker2.setMap(mapObj);
        marker3.setMap(mapObj);
        marker4.setMap(mapObj);
        marker5.setMap(mapObj);
    }

//地图自适应显示函数
    function setMapFitView() {
        var newCenter = mapObj.setFitView();//使地图自适应显示到合适的范围
    }

    function LoadScript() {
        if(typeof (AMap) === "undefined"){
            $.mobile.loading('show');
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.src = "http://webapi.amap.com/maps?v=1.3&key=74407c1eb2eeb673ee97d3b1b0af5416&callback=mapInit";
            document.getElementsByTagName('body')[0].appendChild(script);
        }
    }

    //初始化地图对象，加载地图
    function mapInit() {
        if(typeof (AMap) === "undefined") {
            LoadScript();
        }
        else
        {
            mapObj = new AMap.Map("map", {
                rotateEnable: true,
                dragEnable: true,
                zoomEnable: true,
                //二维地图显示视口
                view: new AMap.View2D({
                    center: new AMap.LngLat(Longitude, Latitude),//地图中心点
                    zoom: 3 //地图显示的缩放级别
                })
            });
            $.mobile.loading('hide');
            zh_en_map();
            addOverlays();
            setMapFitView();
        }
    }

    // draw line

    // function to setup a new canvas for drawing
    function newCanvas(){
        //define and resize canvas
//        $("#canvas-content").height($(window).height() - 106);
//        var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height() - 106)+'"></canvas>';
        $("#canvas-content").height($("#main-content").height());
        var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+$("#main-content").height()+'"></canvas>';
        $("#canvas-content").html(canvas);

        // setup canvas
        ctx = document.getElementById("canvas").getContext("2d");
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;

        // setup to trigger drawing on mouse or touch
        $("#canvas").drawTouch();
        $("#canvas").drawPointer();
        $("#canvas").drawMouse();
    }

// prototype to	start drawing on touch using canvas moveTo and lineTo
    $.fn.drawTouch = function() {
        var start = function(e) {
            e = e.originalEvent;
            ctx.beginPath();
            var x = e.changedTouches[0].pageX;
            var y = e.changedTouches[0].pageY-44;
            ctx.moveTo(x, y);
        };
        var move = function(e) {
            e.preventDefault();
            e = e.originalEvent;
            var x = e.changedTouches[0].pageX;
            var y = e.changedTouches[0].pageY-44;
            ctx.lineTo(x, y);
            ctx.stroke();
        };
        $(this).on("touchstart", start);
        $(this).on("touchmove", move);
    };

// prototype to	start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
    $.fn.drawPointer = function() {
        var start = function(e) {
            e = e.originalEvent;
            ctx.beginPath();
            var x = e.pageX;
            var y = e.pageY-44;
            ctx.moveTo(x, y);
        };
        var move = function(e) {
            e.preventDefault();
            e = e.originalEvent;
            var x = e.pageX;
            var y = e.pageY-44;
            ctx.lineTo(x, y);
            ctx.stroke();
        };
        $(this).on("MSPointerDown", start);
        $(this).on("MSPointerMove", move);
    };

// prototype to	start drawing on mouse using canvas moveTo and lineTo
    $.fn.drawMouse = function() {
        var clicked = 0;
        var start = function(e) {
            clicked = 1;
            ctx.beginPath();
            var x = e.pageX;
            var y = e.pageY-44;
            ctx.moveTo(x, y);
        };
        var move = function(e) {
            if(clicked){
                var x = e.pageX;
                var y = e.pageY-44;
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        };
        var stop = function(e) {
            clicked = 0;
        };
        $(this).on("mousedown", start);
        $(this).on("mousemove", move);
        $(window).on("mouseup", stop);
    };
});
