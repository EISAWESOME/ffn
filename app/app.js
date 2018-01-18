'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngStorage',
  'ngToast',
  'ui.bootstrap',
  'cp.ngConfirm',
  'myApp.login',
  'myApp.home',
  'myApp.notationBallet',
  'myApp.balletSuivant',
  'myApp.validBallet',
  'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/Login'});
}]);

app.run(function ($localStorage, $sessionStorage, $rootScope) {

  //Info de login, en dur car pas d'API
  //$localStorage.$reset();
  $rootScope.$storage = $localStorage;
  console.log($rootScope.$storage);
  $rootScope.$storage.ndc = "csimonin";
  $rootScope.$storage.pass = "1234";
  $rootScope.$storage.role_id = 11;
  $rootScope.$storage.user_id = 1;
  $rootScope.$storage.role_name = "Juge Execution";

  //Tableau qui contient l'odre de passage des ballets.
  //Les juge accède l'index 0 du tableau.
  //Quand un ballet est validé par le juge arbitre, on splice l'index 0

  //Faire un set timeout qui pull l'ordre de passage toute les 10s


  if(!$rootScope.$storage.ordrePassage) {
    console.log($rootScope.$storage);$rootScope.$storage.ordrePassage = [];
  } else {
    if($rootScope.$storage.ordrePassage[0]) {
      if($rootScope.$storage.ordrePassage[0] .type == "Impose"){
      //Cas d'un ballet imposé
      $rootScope.$storage.ordrePassage[0].notes = {
        artistique : 7,
        execution : [6,15],
        difficulte : undefined,
        elements : {
          un : 1,
          deux: 2,
          trois : 3,
          quatre : 4,
          cinq : 5
        }
      };}

            if($rootScope.$storage.ordrePassage[0].type == "Libre"){
                //Cas d'un ballet libre

                $rootScope.$storage.ordrePassage[0].notes = {
                    artistique : 6,
                    difficulte : 5,
                    execution : 3
                }
            }

            console.log($rootScope.$storage);

        }

  }


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

  $rootScope.allPages = [
    {
      "nom": "Login",
      "icon": "img/login.png",
      "url": "#!/Login",
      "roles": [0, 11, 12, 13, 2, 3, 4, 5]
    },

    {
      "nom": "Inscription Nageurs",
      "icon": "img/swimmers.png",
      "url": "#!/",
      "roles": [0, 4]
    },

    {
      "nom": "Notation d'un ballet",
      "icon": "img/grade.png",
      "url": "#!/NotationBallet",
      "roles": [0, 11, 12, 13, 2]
    },

    {
      "nom": "Validation d'un ballet",
      "icon": "img/valid.png",
      "url": "#!/ValidBallet",
      "roles": [0, 3]
    },

    {
      "nom": "Ballet suivant",
      "icon": "img/next.png",
      "url": "#!/BalletSuivant",
      "roles": [0, 3]
    },

    {
      "nom": "Tableau General",
      "icon": "img/score.png",
      "url": "#!/",
      "roles": [0, 11, 12, 13, 2, 3, 4, 5]
    }];


  // Stock une competition (pour l'instant)
  // Il faudra creer un écran intermediaire qui affiche les competition disponible à la notation
  // puis recuperer cette info via une API
  $rootScope.$storage.competitions =
    {
      0:
        {
          "id": 1,
          "date": "25/10/17",
          "ville": "Lyon",
          "Etapes":
            {
              0:
                {
                  "id": 10,
                  "intitule": "Preliminaire",
                  "nbConserve": "5",
                  "Epreuves":
                    {
                      0:
                        {
                          "id": 11,
                          "intitule": "solo",
                          "nbNageur": 1

                        },

                      1:
                        {
                          "id": 12,
                          "intitule": "duo",
                          "nbNageur": 2

                        },

                      2:
                        {
                          "id": 13,
                          "intitule": "equipe",
                          "nbNageur": 3

                        }
                    }

                },

              1:
                {
                  "id": 20,
                  "intitule": "Eliminatoire",
                  "nbConserve": "2",
                  "Epreuves":
                    {
                      0:
                        {
                          "id": 21,
                          "intitule": "solo",
                          "nbNageur": 1

                        },

                      1:
                        {
                          "id": 22,
                          "intitule": "duo",
                          "nbNageur": 2

                        },

                      2:
                        {
                          "id": 23,
                          "intitule": "equipe",
                          "nbNageur": 3

                        }
                    }

                },

              2:
                {
                  "id": 30,
                  "intitule": "Finale",
                  "nbConserve": "1",
                  "Epreuves":
                    {
                      0:
                        {
                          "id": 31,
                          "intitule": "solo",
                          "nbNageur": 1

                        },

                      1:
                        {
                          "id": 32,
                          "intitule": "duo",
                          "nbNageur": 2

                        },

                      2:
                        {
                          "id": 33,
                          "intitule": "equipe",
                          "nbNageur": 3

                        }
                    }

                }
            }


        }

    };

});
