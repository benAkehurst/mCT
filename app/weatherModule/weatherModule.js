(function() {

    'use strict';

    var weatherModule = angular.module("weatherModule", []);

    weatherModule.controller("WeatherController", function($http, $scope, $rootScope, $location) {

        var weatherResults = [];
        $scope.weatherResults = weatherResults;

        $scope.init = function(){
            $http({
                method: "GET",
                url: '/scrapeTlv'
            }).then(function success(response) {
                weatherResults.push(response.data);
            }, function error(response) {
                console.log(response.statusText);
            });
        };
        $scope.init();

        console.log(weatherResults);

    });

})();