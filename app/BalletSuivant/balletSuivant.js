'use strict';

angular.module('myApp.balletSuivant', ['ngRoute', 'ngStorage'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/BalletSuivant', {
      templateUrl: 'BalletSuivant/balletSuivant.html',
      controller: 'balletSuivantCtrl'
    });
  }])

  .controller('balletSuivantCtrl',
    ['$scope', '$localStorage', '$sessionStorage', '$rootScope', '$q', '$ngConfirm', '$window',
      function ($scope, $localStorage, $sessionStorage, $rootScope, $q, $ngConfirm, $window) {
        $scope.init = function () {

          $scope.selectedEtape = undefined;

          $scope.selectedEpreuve = undefined;

          $scope.selectedEquipe = undefined;
          $scope.selectedEquipeNageurs = undefined;

          $scope.selectedTypeBallet = undefined;

          // Doit etre recuperer via l'api
          $scope.allEquipes = [
            {
              id: 901,
              nbNageur: 1,
              nom_club: "69 la trik solo"
            },

            {
              id: 902,
              nbNageur: 2,
              nom_club: "69 la trik duo"
            },

            {
              id: 903,
              nbNageur: 3,
              nom_club: "69 la trik equipe"
            },

            {
              id: 801,
              nbNageur: 1,
              nom_club: "Les filous du poitou solo"
            },

            {
              id: 802,
              nbNageur: 2,
              nom_club: "Les filous du poitou duo"
            },

            {
              id: 803,
              nbNageur: 3,
              nom_club: "Les filous du poitou equipe"
            }
          ];

        };

        $scope.selectEtape = function (etape) {

          console.log(etape);
          $scope.selectedEtape = etape;
          $scope.epreuveEquipes = undefined;
          $scope.selectedEpreuve = undefined;
          $scope.selectedEquipe = undefined;
          $scope.selectedTypeBallet = undefined;
          // Il faut recuperer les equipes qui participe a cette epreuve, ainsi que le nom de leur club

        };

        $scope.selectEpreuve = function (epreuve) {

          console.log(epreuve);
          $scope.selectedEquipe = undefined;
          $scope.selectedTypeBallet = undefined;
          $scope.selectedEpreuve = epreuve;
          $scope.epreuveEquipes = $scope.getEquipes(epreuve.nbNageur);
          // Il faut recuperer les equipes qui participe a cette epreuve, ainsi que le nom de leur club

        };

        $scope.selectEquipe = function (idEpreuve, equipe) {
          $scope.selectedTypeBallet = undefined;
          $scope.selectedEquipe = equipe;

        };

        $scope.selectTypeBallet = function (type) {
          $scope.selectedTypeBallet = type;
          console.log($scope.selectedTypeBallet)

        };

        $scope.getLength = function (obj) {

          return Object.keys(obj).length;

        };


        $scope.getEquipes = function (nbNageur) {
          console.log("On appelle l'API getEquipesByEpreuves! C'est pas en dur du tout");

          var equipes = $scope.allEquipes.filter(function (x) {
            return x.nbNageur == nbNageur;
          });

          console.log(equipes);

          return equipes;
        };

        $scope.submitNext = function () {
          //Demande confirmation

          $ngConfirm({
            title: 'Validez votre choix',
            content: "Confirmer la selection du ballet suivant",
            scope: $scope,
            buttons: {
              submit: {
                text: 'Envoyer',
                btnClass: 'btn-blue',
                action: function () {

                  //Stock dans le ballet suivant dans le storage

                  $scope.$storage.selectedEtape = $scope.selectedEtape;
                  $scope.$storage.selectedEpreuve = $scope.selectedEpreuve;
                  $scope.$storage.selectedEquipe = $scope.selectedEquipe;
                  $scope.$storage.selectedTypeBallet = $scope.selectedTypeBallet;

                  console.log("Stockage des infos du prochain ballet !");

                  //Redirige vers la page d'accueil

                  $window.location.href = '#!/';
                }
              },
              cancel: {
                text: 'Annuler',
                btnClass: 'btn-orange',
                action: function () {
                  console.log('abort');
                }
              }
            }
          });


        };


      }]);
