'use strict';

angular.module('myApp.validBallet', ['ngRoute', 'ngStorage'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/ValidBallet', {
      templateUrl: 'ValidBallet/validBallet.html',
      controller: 'validBalletCtrl'
    });
  }])

  .controller('validBalletCtrl',
    ['$scope', '$localStorage', '$sessionStorage', '$rootScope', '$q', '$ngConfirm', '$window', 'ngToast',
      function ($scope, $localStorage, $sessionStorage, $rootScope, $q, $ngConfirm, $window, ngToast) {
        $scope.init = function () {

          // ballet en cours = $storage.ordrePassage[0]
          $scope.balletEnCours = $rootScope.$storage.ordrePassage[0];

          console.log($scope.balletEnCours.notes);


           /*Il faut verifier que tout les juges ont noté le ballet en cours
           -> API ?
            -On verifie si l'objet $storage.ordrePassage[0].notes est rempli
              /!\ ATTENTION
                Ne marche pas si il y a plus d'un juge pour un seul item (ex : plusieurs juge element ...)
                Pour gere plusieurs juges par type :
                  Il faut gerer les inscriptions de juges, et ensuite verifier les entré dans la table NoteParBalletParJuge
                  L'inscriptions des juges se fait soit :
                    Au moment de la création de la compétition
                    Au moment du choix du ballet suivant -> chiant

           Si tout les juges ont noté le ballet, on recupere et compile les note en un seul tableau
           On propose d'appliquer des pénalité sur chaque note
           Puis on valide la note pour stockage
           Puis on envoi le resultat pour affichage
           */

        };



      }]);
