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

          $scope.balletValide = {
            penalite : 0
          };

          // ballet en cours = $storage.ordrePassage[0]
          $scope.balletEnCours = $rootScope.$storage.ordrePassage[0];

          console.log($scope.balletEnCours);

           /*Il faut verifier que tout les juges ont noté le ballet en cours
           -> API ?
            -On verifie si l'objet $storage.ordrePassage[0].notes est rempli
              /!\ ATTENTION
                Ne marche pas si il y a plus d'un juge pour un seul item (ex : plusieurs juge element ...)
                Pour gere plusieurs juges par type :
                  Il faut gerer les inscriptions de juges, et ensuite verifier les entré dans la table NoteParBalletParJuge
                  L'inscriptions des juges se fait soit :
                    Au moment de la création de la compétition -> On attribue les juges à chaques epreuves
                    Au moment du choix du ballet suivant -> chiant

           Si tout les juges ont noté le ballet, on recupere et compile les note en un seul tableau
           On propose d'appliquer des pénalité sur chaque note
           Puis on valide la note pour stockage
           Puis on envoi le resultat pour affichage
           */




           switch($scope.balletEnCours.type){
             case "Libre" :
               /*Recupere les notes
               Difficule
               Artistique
               execution
               */
               if($scope.balletEnCours.notes.difficulte
                 && $scope.balletEnCours.notes.artistique
                 && $scope.balletEnCours.notes.execution) {
                 $scope.allNotes = true;
               } else {
                 $scope.allNotes = false;
               }

               break;
             case "Impose":
               /*Recupere les notes
               elements
               artistique
               execution
               */
               if(($scope.balletEnCours.notes.elements.un && $scope.balletEnCours.notes.elements.deux && $scope.balletEnCours.notes.elements.trois && $scope.balletEnCours.notes.elements.quatre && $scope.balletEnCours.notes.elements.cinq)
                 && $scope.balletEnCours.notes.artistique
                 && $scope.balletEnCours.notes.execution) {
                 $scope.allNotes = true;


               } else {
                 $scope.allNotes = false;

               }


               break;
             default :
               break;
           }

        };

        $scope.hasMultipleElements = function(note){
          if(Array.isArray(note) && note.length > 1){
            return true
          }
          else {
            return false;
          }
        };

        $scope.getAverageNote = function(notes){
          var total = 0;
          for(var i = 0; i < notes.length; i++){
            total += notes[i];
          }
          return total / notes.length;
        };

        $scope.isNoteElement = function(note){
          if(note && typeof note === 'object' && !Array.isArray(note) ){
            return true
          }
          else {
            return false;
          }
        }



      }]);
