/**
 * Created by Eric on 9/24/2014.
 */

define(['jquery','underscore', 'backbone'],

    function($, _, Backbone){

        'use strict';

        /**
         * Home Model
         * @constructor
         * @private
         */
        var DetailModel = Backbone.Model.extend({

            defaults : {


            },

            flag: false

        });

        return DetailModel;

    });