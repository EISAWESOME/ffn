'use strict';

angular.module('myApp.notationBallet', ['ngRoute', 'ngStorage'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/NotationBallet', {
      templateUrl: 'NotationBallet/notationBallet.html',
      controller: 'notationBalletCtrl'
    });
  }])

  .controller('notationBalletCtrl',
    ['$scope', '$localStorage', '$sessionStorage', '$rootScope', '$q',
      function($scope, $localStorage, $sessionStorage, $rootScope, $q) {
        $scope.init = function(){

          //Initialise la session
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
                                  "nbNageur" : 3

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
                                  "nbNageur" : 3

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
                                  "nbNageur" : 3

                                }
                            }

                        }
                    }


                }

            };

          $scope.selectedEpreuve = undefined;

          $scope.selectedEquipe = undefined;
          $scope.selectedEquipeNageurs = undefined;

          $scope.notes = {
            execution : undefined,
            artistique : undefined,
            difficulte : undefined,
            elements : {
              1 : undefined,
              2 : undefined,
              3 : undefined,
              4 : undefined,
              5 : undefined
            }
          };

          $scope.allEquipes = undefined;

          // Doit etre recuperer via l'api
          $scope.allEquipes = [
            {id : 901,
              nbNageur : 1,
              nom_club : "69 la trik solo"},

            {id : 902,
              nbNageur : 2,
              nom_club : "69 la trik duo"},

            {id : 903,
              nbNageur : 3,
              nom_club : "69 la trik equipe"},

            {id : 801,
              nbNageur : 1,
              nom_club : "Les filous du poitou solo"},

            {id : 802,
              nbNageur : 2,
              nom_club : "Les filous du poitou duo"},

            {id : 803,
              nbNageur : 3,
              nom_club : "Les filous du poitou equipe"}
          ];

          //On RaZ au cas où
          $scope.resetEpreuve();
          $scope.resetEquipe();

        };

        $scope.resetEpreuve = function(){

          $scope.selectedEquipe = undefined;
          $scope.selectedEpreuve = undefined;
          $scope.notes = {
            execution : undefined,
            artistique : undefined,
            difficulte : undefined,
            elements : {
              1 : undefined,
              2 : undefined,
              3 : undefined,
              4 : undefined,
              5 : undefined
            }
          };

        };

        $scope.resetEquipe = function(){

          $scope.selectedEquipe = undefined;
          $scope.notes = {
            execution : undefined,
            artistique : undefined,
            difficulte : undefined,
            elements : {
              1 : undefined,
              2 : undefined,
              3 : undefined,
              4 : undefined,
              5 : undefined
            }
          };

        };

        $scope.selectEpreuve = function(epreuve){

          $scope.selectedEpreuve = epreuve;
          $scope.epreuveEquipes = $scope.getEquipes(epreuve.nbNageur);
          // Il faut recuperer les equipes qui participe a cette epreuve, ainsi que le nom de leur club

        };

        $scope.selectEquipe = function(idEpreuve, equipe){
          $scope.getNageursAsync(idEpreuve, equipe.id).then(function(nageurs){
            $scope.selectedEquipeNageurs = nageurs;
            $scope.selectedEquipe = equipe;
          });

        };

        $scope.getEquipes = function(nbNageur){
          console.log("On appelle l'API getEquipesByEpreuves! C'est pas en dur du tout");

          var equipes = $scope.allEquipes.filter(function(x){
            return x.nbNageur == nbNageur;
          });

          return equipes;
        };

        $scope.getNageursAsync = function(idEpreuve, idEquipe){
          var nageurDefer = $q.defer();

          // On recupere les equipe en dur
          // Il faut recuperer l'equipe concerné grace à l'API

          if(idEquipe == 901){
            var nageurs = [
              {id_equipe : 901,
                nom_club : "69 la trik solo",
                nageurs : {
                  0 : {
                    nom : "Gilot",
                    prenom : "Luc",
                    user_id : 666,
                  }
                }}
            ];

            nageurDefer.resolve(nageurs);
          }

          if(idEquipe == 902){
            var nageurs = [
              {id_equipe : 902,
                nom_club : "69 la trik duo",
                nageurs : {
                  0 : {
                    nom : "Gilot",
                    prenom : "Luc",
                    user_id : 666
                  },

                  1 : {
                    nom : "Alluin",
                    prenom : "Philippe",
                    user_id : 555
                  }
                }}
            ];

            nageurDefer.resolve(nageurs);
          }

          if(idEquipe == 903){
            var nageurs = [
              {id_equipe : 903,
                nom_club : "69 la trik equipe",
                nageurs : {
                  0 : {
                    nom : "Gilot",
                    prenom : "Luc",
                    user_id : 666
                  },

                  1 : {
                    nom : "Alluin",
                    prenom : "Philippe",
                    user_id : 555
                  },

                  2 : {
                    nom : "Malnuit",
                    prenom : "Agnes",
                    user_id : 444
                  }
                }}
            ];

            nageurDefer.resolve(nageurs);
          }

          if(idEquipe == 801){
            var nageurs = [
              {id_equipe : 801,
                nom_club : "Les filou du poitou solo",
                nageurs : {
                  0 : {
                    nom : "Doe",
                    prenom : "John",
                    user_id : 333
                  }
                }}
            ];

            nageurDefer.resolve(nageurs);
          }

          if(idEquipe == 802){
            var nageurs = [
              {id_equipe : 802,
                nom_club : "Les filou du poitou duo",
                nageurs : {
                  0 : {
                    nom : "Doe",
                    prenom : "John",
                    user_id : 333
                  },

                  1 : {
                    nom : "Ragout",
                    prenom : "Dylan",
                    user_id : 222
                  }
                }}
            ];

            nageurDefer.resolve(nageurs);
          }

          if(idEquipe == 803){
            var nageurs = [
              {id_equipe : 803,
                nom_club : "Les filou du poitou equipe",
                nageurs : {
                  0 : {
                    nom : "Doe",
                    prenom : "John",
                    user_id : 333
                  },

                  1 : {
                    nom : "Ragout",
                    prenom : "Dylan",
                    user_id : 222
                  },

                  2 : {
                    nom : "Polnareff",
                    prenom : "Jean-Pierre",
                    user_id : 111
                  }
                }}
            ];

            nageurDefer.resolve(nageurs);
          }

          return nageurDefer.promise;

        };

        //En fonction du role du juge, on soumet la note qui lui correspond
        $scope.submitNotes = function(){
          // Avec l'id de l'epreuve et du club selectionné, on peut en deduire, on peut trouver l'id du ballet
          // On recupere ensuite l'ID du ballet
          // Puis on crée une entrée dans la table NoteParBalletParJuge

          console.log('Epreuve id : ' + $scope.selectedEpreuve.id);
          console.log('Equipe id : ' + $scope.selectedEquipe.id );

          //Demande confirmation à l'utilisateur

          /*
          idBallet -> requeter grace a idEpreuve et idClub
          idJuge -> recuperer lors du login, et stocker dans le $storage
          idTypeNote -> semblable que le type de juge
            11 : execution
            12 : artistique
            13 : difficulté
            21 : element 1
            22 : element 2
            23 : element 3
            24 : element 4
            25 : element 5
          note -> variable du scope, en fonction de l'id du juge log

          passe toutes ces infos a l'API de creation de note
          */

          var noteAEnvoyer = undefined;

          switch($scope.$storage.role_id){
            case 11:
              noteAEnvoyer = $scope.notes.execution;
              break;
            case 12:
              noteAEnvoyer = $scope.notes.artistique;
              break;
            case 13:
              noteAEnvoyer = $scope.notes.difficulte;
              break;
            case 2:
              noteAEnvoyer = $scope.notes.elements;
              break;
            default:
              // ???
              break;
          }

          console.log($scope.notes);
          console.log(noteAEnvoyer);

          //Redirige au menu principal


        }



      }]);
