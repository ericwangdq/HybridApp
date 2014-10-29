/**
 * Created by Eric on 9/24/2014.
 */

define(['jquery','underscore', 'backbone', 'detail/detail-page/detail-model', 'text!detail/detail-page/detail-page.html',
        'text!settingPanel', 'iscroll', 'datePicker/js/datepicker','datePicker/js/jquery.mobile.datepicker','css!detail/common/css/detail-page.css',
        'css!datePicker/css/jquery.mobile.datepicker.css','css!datePicker/css/jquery.mobile.datepicker.theme.css'],

    function($, _, Backbone, DetailModel, DetailPageTemplate, SettingPanelTemplate) {

        'use strict';

        var DetailPage = Backbone.View.extend({

            model: null,

            template: _.template(DetailPageTemplate + SettingPanelTemplate),

            //用于创建el下的属性
            attributes: function() {
                return{
                    'data-role': 'page',
                    'class': 'layout',
                    'id': 'detail-page'
                }
            },

            initialize: function() {

                var me = this;

                if(!me.model){
                    me.model =  new DetailModel();
                    // me.listenTo(me.model, 'change', me.login);
                }
                //$( ".date-input-css" ).datepicker();
                //alert("Detail page initialize: " + $('.date-input-css').length);
            },

            render: function(){

                this.el.innerHTML = this.template(this.model.toJSON());
                //alert("Detail page render: " + $('.date-input-css').length);
            },

            renderCompleted: function(){

                var me = this;
                //alert("Detail page renderCompleted: " + $('.date-input-css').length);
               $( "input.date-input-css").datepicker();
            }

        });

        return DetailPage;

    });