(function () {
    'use strict';

    function rockGameService($http, $q, CODE) {

        var resetData = function () {
            return $http({
                method: 'DELETE',            
                url: 'http://bryanmuvi-001-site1.btempurl.com/api/championship/reset',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
            }).then(function (response) {
                var deferred = $q.defer();
                deferred.resolve(response.data);
                return deferred.promise;
            });
        };

        var pushResults = function (firstPlace, secondPlace) {
            return $http({
                method: 'POST',
                url: 'http://bryanmuvi-001-site1.btempurl.com/api/championship/result?first=' + firstPlace + "&second=" + secondPlace,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
            }).then(function (response) {
                var deferred = $q.defer();
                    deferred.resolve(response.data);
                    return deferred.promise;           
            });
        };

        var getRanking = function (amount) {
            return $http({
                method: 'GET',
                url: 'http://bryanmuvi-001-site1.btempurl.com/api/championship/top?count=' + amount,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
            }).then(function (response) {
                var deferred = $q.defer();
                deferred.resolve(response.data);
                return deferred.promise;
            });
        };
      
        return {
            resetData: resetData,
            pushResults: pushResults,
            getRanking: getRanking
        };
    }
    angular.module('rockGame').factory('rockGameService', ['$http', '$q', rockGameService]);
})();