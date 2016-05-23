'use strict';
angular.module('rockGame')
  .controller('rankingController', function ($scope, $http, rockGameService) {
      
      rockGameService.getRanking(10).then(function (data) {
          $scope.ranking = JSON.parse(data);           
      });

      $scope.reset = function () {
          rockGameService.resetData().then(function (data) {
              $scope.ranking = JSON.parse(data);       
          }).then(function () {
              rockGameService.getRanking(10).then(function (data) {
                  $scope.ranking = JSON.parse(data);          
              });
          });
      }

  });