(function() {

    'use strict';

    var weatherModule = angular.module("weatherModule", []);

    weatherModule.controller("WeatherController", function($http, $scope, $rootScope, $location) {

        var weatherResults = [];
        var buttonWeather = [];
        $scope.weatherResults = weatherResults;
        $scope.buttonWeather = buttonWeather;

        $scope.cityButtons = [
            {city:'New York City', url:'https://www.accuweather.com/en/us/new-york-ny/10007/current-weather/349727'},
            {city:'Los Angeles', url:'https://www.accuweather.com/en/us/los-angeles-ca/90012/current-weather/347625'},
            {city:'Paris', url:'https://www.accuweather.com/en/fr/paris/623/current-weather/623'},
            {city:'Tokyo', url:'https://www.accuweather.com/en/jp/tokyo/226396/current-weather/226396'},
            {city:'Hong Kong', url:'https://www.accuweather.com/en/hk/hong-kong/1123655/current-weather/1123655'}
        ];



        $scope.init = function(){
            $http({
                method: "GET",
                url: '/scrapeTlv'
            }).then(function success(response) {
                weatherResults.push(response.data);
                scrapeLdn();
            }, function error(response) {
                console.log(response.statusText);
            });
        };
        $scope.init();

        var scrapeLdn = function(){
            $http({
                method: "GET",
                url: '/scrapeLdn'
            }).then(function success(response) {
                weatherResults.push(response.data);
            }, function error(response) {
                console.log(response.statusText);
            });
        };

        $scope.cityButtonSearch = function(url,cityName){
            var data = {
                url:url,
                cityName:cityName
            };
            $http({
                method: "POST",
                url: '/weatherButton',
                data:data
            }).then(function success(response) {
                buttonWeather.push(response.data);
            }, function error(response) {
                console.log(response.statusText);
            });
        }

        // console.log(weatherResults);

    });

})();