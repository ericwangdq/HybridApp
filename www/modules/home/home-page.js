/**
 * Created by Eric on 9/22/2014.
 */

define(['jquery','underscore', 'backbone', 'home/home-page/home-model',
        'text!home/home-page/home-page.html', 'text!settingPanel', 'iscroll', 'css!home/common/css/home-page.css'],

    function($, _, Backbone, HomeModel, HomePageTemplate, SettingPanelTemplate) {

        'use strict';

        var HomePage = Backbone.View.extend({

            model: null,

            template: _.template(HomePageTemplate + SettingPanelTemplate),

            //用于创建el下的属性
            attributes: function() {
                return{
                    'data-role': 'page',
                    'class': 'layout',
                    'id': 'home-page'
                }
            },

            initialize: function() {

                var me = this;
                if(!me.model){
                    me.model =  new HomeModel();
                    // me.listenTo(me.model, 'change', me.login);
                }

            },

            render: function(){

                this.el.innerHTML = this.template(this.model.toJSON());

            },

            renderCompleted: function(){

                var me = this;

            }

        });

        return HomePage;

    });

