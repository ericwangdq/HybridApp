/**
 * Created by Eric on 9/24/2014.
 */

define(['jquery','underscore', 'backbone', 'listing/listing-page/listing-model','text!listing/listing-page/listing-page.html',
        'text!settingPanel', 'iscroll', 'css!listing/common/css/listing-page.css'],

function($, _, Backbone, ListingModel, ListingPageTemplate, SettingPanelTemplate) {

    'use strict';

    var ListingPage = Backbone.View.extend({

        model: null,

        template: _.template(ListingPageTemplate + SettingPanelTemplate),

        //用于创建el下的属性
        attributes: function() {
            return{
                'data-role': 'page',
                'class': 'layout',
                'id': 'listing-page'
            }
        },

        initialize: function() {

            var me = this;

            if(!me.model){
                me.model =  new ListingModel();
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

    return ListingPage;

});
