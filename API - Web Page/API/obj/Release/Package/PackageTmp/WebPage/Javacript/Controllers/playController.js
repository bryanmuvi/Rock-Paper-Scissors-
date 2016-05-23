'use strict';
angular.module('rockGame')
  .controller('playController', function ($scope, $http, rockGameService) {
     
      $scope.analize = function () {
          $scope.value = $scope.file.data;
          var plainValue = $scope.value;
          var listPlayers = JSON.parse(plainValue);
          var winner = tournamentRound(listPlayers);
      }

      //Let´s order the array before the new round
      var prepareArray = function (list) {
          var newListPlayers = [];
          for (var i = 0; i < list.length; i = i + 2) {
              var index = i / 2;
              newListPlayers[index] = [list[i], list[i + 1]]
          }
          tournamentRound(newListPlayers);
      }

      //Let´s play a new round
      var tournamentRound = function (list) {

          //Is the final?
          if (list.length == 1) {
              var user1 = list[0][0], user2 = list[0][1]
          }
          //The round begins
          for (var i = 0; i < list.length; i++) {
              list[i] = play(list[i]);
          }
          if (list.length > 1) { prepareArray(list) }
          else {
              if (user1[0] == list[0][0]) { $scope.runnerUp = user2[0] }
              else { $scope.runnerUp = user1[0] }
              $scope.winner = list[0][0];
              rockGameService.pushResults($scope.winner, $scope.runnerUp).then(function (data) {
                  $scope.showResults = true; 
              });
              return list;
          }
      }

      //Let´s play a match 
      var play = function (players) {
          var playerOneMove = players[0][1];
          var playerTwoMove = players[1][1];
          if (playerOneMove == playerTwoMove) { return players[0] }
          if (playerOneMove == "P" && playerTwoMove == "R" || playerOneMove == "R" && playerTwoMove == "S" || playerOneMove == "S" && playerTwoMove == "P") {
              return players[0];
          }
          else {
              return players[1];
          }
      }

  });