/**
 * Created by Eric on 9/24/2014.
 */

define(['jquery','underscore', 'backbone'],

    function($, _, Backbone){

        'use strict';

        /**
         * Listing Model
         * @constructor
         * @private
         */
        var ListingModel = Backbone.Model.extend({

            defaults : {


            },

            flag: false

        });

        return ListingModel;

    });