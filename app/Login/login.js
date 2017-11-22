'use strict';

angular.module('myApp.login', ['ngRoute', 'ngStorage'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Login', {
    templateUrl: 'Login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl',
  ['$scope', '$localStorage', '$sessionStorage', '$rootScope',
  function($scope, $localStorage, $sessionStorage, $rootScope) {
    $scope.loginError = undefined;

    // On set les variable de session en dur.
    // l'idée est de les recuperer grace au webservice d'Alexis
    $scope.$storage = $localStorage;
    $scope.$storage.ndc = "csimonin";
    $scope.$storage.pass = "1234";
    $scope.$storage.role_id = 0;
    $scope.$storage.user_id = 1;
    $scope.$storage.role_name = "Juge execution";



}]);
