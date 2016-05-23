'use strict';

/**
 * @ngdoc overview
 * @name dataGenApp
 * @description
 * # dataGenApp
 *
 * Main module of the application.
 */
angular
  .module('dataGenApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/stocks', {
        templateUrl: 'views/main.html',
        controller: 'StockCtrl',
        controllerAs: 'stock'
      });
  });
