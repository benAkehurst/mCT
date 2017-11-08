(function() {

    'use strict';

    var weatherModule = angular.module("weatherModule", []);

    weatherModule.controller("WeatherController", function($http, $scope, $timeout) {

        var weatherResults = [];
        var buttonWeather = [];
        $scope.weatherResults = weatherResults;
        $scope.buttonWeather = buttonWeather;

        $scope.cityButtons = [
            {city:'New York City', url:'https://www.accuweather.com/en/us/new-york-ny/10007/current-weather/349727', imgUrl:'/nycImage.jpeg'},
            {city:'Los Angeles', url:'https://www.accuweather.com/en/us/los-angeles-ca/90012/current-weather/347625', imgUrl:'/losAngelesImage.jpeg'},
            {city:'Paris', url:'https://www.accuweather.com/en/fr/paris/623/current-weather/623', imgUrl:'/parisImage.jpeg'},
            {city:'Tokyo', url:'https://www.accuweather.com/en/jp/tokyo/226396/current-weather/226396', imgUrl:'/tokyoImage.jpeg'},
            {city:'Hong Kong', url:'https://www.accuweather.com/en/hk/hong-kong/1123655/current-weather/1123655', imgUrl:'/hongKongImage.jpeg'},
            {city:'Sydney', url:'https://www.accuweather.com/en/au/sydney/22889/current-weather/22889', imgUrl:'/sydneyImage.jpeg'}

        ];


        var getWeather = function(){
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

        getWeather();

        $scope.cityButtonSearch = function(url,cityName,imgUrl){
            var data = {
                url:url,
                cityName:cityName,
                imgUrl:imgUrl
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
        };

        $scope.searchCity = function(name){
            console.log(name);
        };

        $scope.removeWeatherCity = function(index){
            $scope.buttonWeather.splice(index, 1);
        };

    });

})();