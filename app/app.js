(function(){
    
    'use strict';
    
    var appModule = angular.module("appModule", ["ngRoute", "weatherModule"]);
    
    appModule.config(function($routeProvider){

        $routeProvider

            .when("/", {
                controller: "WeatherController",
                templateUrl: "app/weatherModule/weatherView.html"
            })
            .when("/weather", {
                controller: "WeatherController",
                templateUrl: "app/weatherModule/weatherView.html"
            })
        
    });
    
})();