'use strict';

angular.module('myApp.home', ['ngRoute', 'ngStorage'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'Home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl',
        ['$scope', '$localStorage', '$sessionStorage', '$rootScope', '$window',
            function ($scope, $localStorage, $sessionStorage, $rootScope, $window) {


                $scope.color = [
                    {'background-color': '#c5ffbf'},
                    {'background-color': '#ffc1c1'},
                    {'background-color': '#c1c5ff'},
                    {'background-color': '#f8ffd1'},
                    {'background-color': '#e2e3e8'},
                    {'background-color': '#ffcaf9'}
                ];
                //Rend toute les données de $scope.$storage persistante à travers les sessions
                // $scope.$storage = $localStorage;
            }]);
