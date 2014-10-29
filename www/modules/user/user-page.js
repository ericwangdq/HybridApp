/**
 * Created by Eric on 9/28/2014.
 */

define(['jquery','underscore', 'backbone', 'user/user-page/user-model',
        'text!user/user-page/user-page.html', 'text!settingPanel', 'iscroll', 'css!user/common/css/user-page.css'],

    function($, _, Backbone, UserModel, UserPageTemplate, SettingPanelTemplate) {

        'use strict';

        var UserPage = Backbone.View.extend({

            model: null,

            template: _.template(UserPageTemplate + SettingPanelTemplate),

            //用于创建el下的属性
            attributes: function() {
                return{
                    'data-role': 'page',
                    'class': 'layout',
                    'id': 'user-page'
                }
            },

            initialize: function() {

                var me = this;
                if(!me.model){
                    me.model =  new UserModel();
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

        return UserPage;

    });

