/**
 * Created by Eric on 9/23/2014.
 */

define(['jquery','underscore', 'backbone'],

    function($, _, Backbone){

        'use strict';

        /**
         * Home Model
         * @constructor
         * @private
         */
        var HomeModel = Backbone.Model.extend({

            defaults : {


            },

            flag: false

        });

        return HomeModel;

    });