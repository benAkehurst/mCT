(function () {

    'use strict';

    var weatherModule = angular.module("weatherModule", []);

    weatherModule.controller("WeatherController", function ($http, $scope, $timeout) {

        var weatherResults = [];
        var buttonWeather = [];
        var searchedWeather = [];
        $scope.weatherResults = weatherResults;
        $scope.buttonWeather = buttonWeather;
        $scope.searchedWeather = searchedWeather;

        $scope.cityButtons = [
            {
                city: 'New York City, USA',
                url: 'https://www.accuweather.com/en/us/new-york-ny/10007/current-weather/349727',
                imgUrl: '/nycImage.jpeg'
            },
            {
                city: 'Los Angeles, USA',
                url: 'https://www.accuweather.com/en/us/los-angeles-ca/90012/current-weather/347625',
                imgUrl: '/losAngelesImage.jpeg'
            },
            {
                city: 'Paris, France',
                url: 'https://www.accuweather.com/en/fr/paris/623/current-weather/623',
                imgUrl: '/parisImage.jpeg'
            },
            {
                city: 'Tokyo, Japan',
                url: 'https://www.accuweather.com/en/jp/tokyo/226396/current-weather/226396',
                imgUrl: '/tokyoImage.jpeg'
            },
            {
                city: 'Hong Kong',
                url: 'https://www.accuweather.com/en/hk/hong-kong/1123655/current-weather/1123655',
                imgUrl: '/hongKongImage.jpeg'
            },
            {
                city: 'Sydney, Australia',
                url: 'https://www.accuweather.com/en/au/sydney/22889/current-weather/22889',
                imgUrl: '/sydneyImage.jpeg'
            }

        ];

        var getWeather = function () {
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

        var scrapeLdn = function () {
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

        $scope.cityButtonSearch = function (url, cityName, imgUrl) {
            var data = {
                url: url,
                cityName: cityName,
                imgUrl: imgUrl
            };
            $http({
                method: "POST",
                url: '/weatherButton',
                data: data
            }).then(function success(response) {
                buttonWeather.push(response.data);
            }, function error(response) {
                console.log(response.statusText);
            });
        };

        $scope.searchCity = function (name) {
            $('.search_city_input').val('');
            $.simpleWeather({
                location: name,
                unit: 'c',
                success: function (weather) {
                    var bgColor = randomColor();
                    var obj = {location: weather.city, temp: weather.temp + '°', currentConditions: weather.currently, wind:weather.wind.speed + 'km/h', humidity:weather.humidity + '%', backgorundColor: bgColor};
                    searchedWeather.push(obj);
                },
                error: function (error) {
                    console.log("Error: " + error);
                }
            });
        };

        $scope.removeWeatherCity = function (index) {
            $scope.buttonWeather.splice(index, 1);
        };
        $scope.removeWeatherSearchedCity = function (index) {
            $scope.searchedWeather.splice(index, 1);
        };

        function randomColor(){
            var arr = ['#1abc9c','#27ae60','#e74c3c','#8e44ad','#34495e','#c0392b','#f1c40f','#16a085','#f39c12','#9b59b6','#3498db'];
            var randomColor = arr[Math.floor(Math.random() * arr.length)];
            return randomColor;
        }

    });

})();