(function () {
    'use strict';

    var hoursTracker = angular.module("rockGame", ['ngRoute', 'ngResource']).config(function ($routeProvider) {
        $routeProvider
          .when('/main', {
              templateUrl: 'WebPage/Partials/main.html',
              controller: 'mainController'
          })
          .when('/play', {
              templateUrl: 'WebPage/Partials/play.html',
              controller: 'playController'
          })
           .when('/example', {
               templateUrl: 'WebPage/Partials/example.html',
               controller: 'exampleController'
           })
          .when('/rankings', {
              templateUrl: 'WebPage/Partials/rankings.html',
              controller: 'rankingController'
          })
          .when('/about', {
              templateUrl: 'WebPage/Partials/about.html',
               controller: 'aboutController'
           })
          .otherwise({
              redirectTo: '/main'
          });
    });


})();