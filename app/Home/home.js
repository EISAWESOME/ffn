'use strict';

angular.module('myApp.home', ['ngRoute', 'ngStorage'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'Home/home.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl',
    ['$scope', '$localStorage', '$sessionStorage', '$rootScope',
      function ($scope, $localStorage, $sessionStorage, $rootScope) {

        //Rend toute les données de $scope.$storage persistante à travers les sessions
        // $scope.$storage = $localStorage;


      }]);
