'use strict';

angular.module('myApp.tableauAffichage', ['ngRoute', 'ngStorage'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Scores', {
            templateUrl: 'TableauAffichage/tableauAffichage.html',
            controller: 'TableauAffichageCtrl'
        });
    }])

    .controller('TableauAffichageCtrl',
        ['$scope', '$localStorage', '$sessionStorage', '$rootScope',
            function ($scope, $localStorage, $sessionStorage, $rootScope) {
                console.log($rootScope.$storage);
                $scope.init = function () {

                    $scope.affichage = $rootScope.$storage.tableauAffichage;
                    console.log($scope.affichage);

                }


            }]);
