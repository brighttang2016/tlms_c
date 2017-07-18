'use strict';

/* Filters */
// need load the moment.js to use this filter. 
var app = angular.module('myApp');
app.filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });