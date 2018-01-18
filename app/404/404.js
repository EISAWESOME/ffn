'use strict';

angular.module('myApp.404', ['ngRoute', 'ngStorage'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/404', {
            templateUrl: '404/404.html',
            controller: '404Ctrl'
        });
    }])

    .controller('404Ctrl',
        ['$scope', '$localStorage', '$sessionStorage', '$rootScope',
            function ($scope, $localStorage, $sessionStorage, $rootScope) {

                //Rend toute les données de $scope.$storage persistante à travers les sessions
                // $scope.$storage = $localStorage;


            }]);
