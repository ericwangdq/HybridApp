/**
 * Created by Eric on 9/28/2014.
 */


define(['jquery','underscore', 'backbone'],

    function($, _, Backbone){

        'use strict';

        /**
         * Home Model
         * @constructor
         * @private
         */
        var UserModel = Backbone.Model.extend({

            defaults : {


            },

            flag: false

        });

        return UserModel;

    });