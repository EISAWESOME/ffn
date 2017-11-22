'use strict';

angular.module('myApp.notationBallet', ['ngRoute', 'ngStorage'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/NotationBallet', {
      templateUrl: 'NotationBallet/notationBallet.html',
      controller: 'notationBalletCtrl'
    });
  }])

  .controller('notationBalletCtrl',
    ['$scope', '$localStorage', '$sessionStorage', '$rootScope',
      function($scope, $localStorage, $sessionStorage, $rootScope) {

        $scope.$storage = $localStorage;

        //Stock une competition (pour l'instant)
        // Il faudra creer un écran intermediaire qui affiche les competition disponible à la notation
        // puis recuperer cette info via une API
        $scope.$storage.competitions =
          {
          0 :
            {
            "id" : 1,
            "date"  : "25/10/17",
            "ville" : "Lyon",
            "Etapes" :
              {
                0 :
                  {
                  "id" : 10,
                  "intitule" : "Preliminaire",
                  "nbConserve" : "5",
                  "Epreuves" :
                    {
                      0 :
                        {
                          "id" : 11,
                          "intitule" : "solo",
                          "nbNageur" : 1

                        },

                      1 :
                        {
                          "id" : 12,
                          "intitule" : "duo",
                          "nbNageur" : 2

                        },

                      2 :
                        {
                          "id" : 13,
                          "intitule" : "equipe",
                          "nbNageur" : 5

                        }
                    }

                  },

                1 :
                  {
                    "id" : 20,
                    "intitule" : "Eliminatoire",
                    "nbConserve" : "2",
                    "Epreuves" :
                      {
                        0 :
                          {
                            "id" : 21,
                            "intitule" : "solo",
                            "nbNageur" : 1

                          },

                        1 :
                          {
                            "id" : 22,
                            "intitule" : "duo",
                            "nbNageur" : 2

                          },

                        2 :
                          {
                            "id" : 23,
                            "intitule" : "equipe",
                            "nbNageur" : 5

                          }
                      }

                  },

                2 :
                  {
                    "id" : 30,
                    "intitule" : "Finale",
                    "nbConserve" : "1",
                    "Epreuves" :
                      {
                        0 :
                          {
                            "id" : 31,
                            "intitule" : "solo",
                            "nbNageur" : 1

                          },

                        1 :
                          {
                            "id" : 32,
                            "intitule" : "duo",
                            "nbNageur" : 2

                          },

                        2 :
                          {
                            "id" : 33,
                            "intitule" : "equipe",
                            "nbNageur" : 5

                          }
                      }

                  }
              }


            }

          };

        $scope.selectedEpreuve = undefined;
        $scope.selectedEquipe = undefined;

        $scope.resetEpreuve = function(){

          $scope.selectedEpreuve = undefined;

        };

        $scope.resetEquipe = function(){

          $scope.selectedEquipe = undefined;

        };

        $scope.selectEpreuve = function(epreuve){

          $scope.selectedEpreuve = epreuve;
          $scope.getEquipes(epreuve.id);
          // Il faut recuperer les equipes qui participe a cette epreuve, ainsi que le nom de leur club


        };

        $scope.getEquipes = function(idEpreuve){
          console.log("On appelle l'API getEquipesByEpreuves! C'est pas en dur du tout");
          return json = {
            id : 999,
            nom_equipe : "69 la trik"

          };



        };

        $scope.getNageurs = function(idEpreuve, idEquipe){
          console.log("On appelle l'API getNageursByEquipeEpreuve ! C'est pas en dur du tout");
          return json = {
            id_equipe : 999,
            nom_equipe : "69 la trik",
            nageurs : {
              0 : {
                nom : "Gilot",
                prenom : "Luc"
              },

              1 : {
                nom : "Alluin",
                prenom : "Philippe"
              },

              2 : {
                nom : "Malnuit",
                prenom : "Agnes"
              }
            }

          };
        }



      }]);
