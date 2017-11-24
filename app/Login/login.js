'use strict';

angular.module('myApp.login', ['ngRoute', 'ngStorage'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/Login', {
      templateUrl: 'Login/login.html',
      controller: 'LoginCtrl'
    });
  }])

  .controller('LoginCtrl',
    ['$scope', '$localStorage', '$sessionStorage', '$rootScope',
      function ($scope, $localStorage, $sessionStorage, $rootScope) {
        $scope.loginError = undefined;

        // On set les variable de session en dur.
        // l'idée est de les recuperer grace au webservice d'Alexis

        // Roles :
        // 0 = admin
        // 1x = juge type
        //  11 = juge execution
        //  12 = juge artistique
        //  13 = juge difficulté
        // 2 = juge element
        // 3 = juge arbitre
        // 4 = coach
        // 5 = guest

        /*
        $rootScope.$storage = $localStorage;
        $rootScope.$storage.ndc = "csimonin";
        $rootScope.$storage.pass = "1234";
        $rootScope.$storage.role_id = 11;
        $rootScope.$storage.user_id = 1;
        $rootScope.$storage.role_name = "Juge execution";
        */


      }]);
