'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'ngStorage',
  'ngToast',
  'ui.bootstrap',
  'cp.ngConfirm',
  'myApp.login',
  'myApp.home',
  'myApp.notationBallet',
  'myApp.balletSuivant',
  'myApp.validBallet',
  'myApp.tableauAffichage',
  'myApp.404',
  'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/Login'});
}]);

app.run(function ($localStorage, $sessionStorage, $rootScope, ngToast, $window) {

  $rootScope.$storage = $localStorage;
  console.log($rootScope.$storage);

  if ($rootScope.$storage.role_id || $rootScope.$storage.role_id == 0) {

  } else {
    $rootScope.$storage.role_id = 5;
  }

  $rootScope.resetStorage = function () {
    $localStorage.$reset();
    $rootScope.logout();
    $rootScope.$storage.role_id = 5;
    $window.location.href = "http://" + $window.location.host + "/app/#!/";
  };

  $rootScope.logout = function () {
    delete $rootScope.$storage.ndc;
    delete $rootScope.$storage.role_name;
    $rootScope.$storage.role_id = 5;
    $rootScope.allPages[0] =
    {
      "nom": "Connexion",
      "icon": "img/login.svg",
      "url": "#!/Login",
      "roles": [0, 11, 12, 13, 2, 3, 4, 5]
    };
    $window.location.href = "http://" + $window.location.host + "/app/#!/";
  };

  $rootScope.redirectWrongPath = function () {
    console.log('404');
    $window.location.href = "http://" + $window.location.host + "/app/#!/404";
  };

  //Tableau qui contient l'odre de passage des ballets.
  //Les juge accède l'index 0 du tableau.
  //Quand un ballet est validé par le juge arbitre, on splice l'index 0

  //Faire un set timeout qui pull l'ordre de passage toute les 10s

  $rootScope.$on('toast', function (message) {
    ngToast.create(message);
  });

  $rootScope.redirect = function (url) {
    switch (url) {
      case 'LOGOUT' :
        $rootScope.logout();
        break;
      default :
        $window.location.href = "http://" + $window.location.host + "/app/" + url;
        break;
    }
    console.log(url);

  };


  $rootScope.currentOrdre = 0;
  $rootScope.previousOrdre = function () {
    if ($rootScope.$storage.ordrePassage[$rootScope.currentOrdre - 1])
      $rootScope.currentOrdre--;
  };
  $rootScope.nextOrdre = function () {
    if ($rootScope.$storage.ordrePassage[$rootScope.currentOrdre + 1])
      $rootScope.currentOrdre++;
  };


  $rootScope.$storage.ordrePassage = $rootScope.$storage.ordrePassage ? $rootScope.$storage.ordrePassage : [];


  $rootScope.toggleTestData = function () {
    console.log("Entre des note pour le ballet suivant");
    if ($rootScope.$storage.ordrePassage[0]) {
      if ($rootScope.$storage.ordrePassage[0].type == "Impose") {
        //Cas d'un ballet imposé
        $rootScope.$storage.ordrePassage[0].notes = {
          artistique: 7,
          execution: 5.5,
          elements: {
            un: 1,
            deux: 2,
            trois: 3,
            quatre: 4,
            cinq: 5
          }
        };
      }

      if ($rootScope.$storage.ordrePassage[0].type == "Libre") {
        //Cas d'un ballet libre

        $rootScope.$storage.ordrePassage[0].notes = {
          artistique: 6,
          difficulte: 5,
          execution: 8
        }
      }

      console.log($rootScope.$storage);
      location.reload();

    }

  };


  $rootScope.hashCode = function (str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  $rootScope.intToRGB = function(i){

    var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
  };


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
      "nom": "Connexion",
      "icon": "img/login.svg",
      "url": "#!/Login",
      "roles": [0, 11, 12, 13, 2, 3, 4, 5]
    },

    {
      "nom": "Inscription Nageurs",
      "icon": "img/swimmers.svg",
      "url": "#!/",
      "roles": [0, 4]
    },

    {
      "nom": "Notation d'un ballet",
      "icon": "img/grade.svg",
      "url": "#!/NotationBallet",
      "roles": [0, 11, 12, 13, 2]
    },

    {
      "nom": "Validation d'un ballet",
      "icon": "img/valid.svg",
      "url": "#!/ValidBallet",
      "roles": [0, 3]
    },

    {
      "nom": "Ballet suivant",
      "icon": "img/next.svg",
      "url": "#!/BalletSuivant",
      "roles": [0, 3]
    },

    {
      "nom": "Scores",
      "icon": "img/score.svg",
      "url": "#!/Scores",
      "roles": [0, 11, 12, 13, 2, 3, 4, 5]
    }];

  if ($rootScope.$storage.ndc) {
    $rootScope.allPages[0] =
      {
        "nom": "Deconnexion",
        "icon": "img/logout.svg",
        "url": "LOGOUT",
        "roles": [0, 11, 12, 13, 2, 3, 4, 5]
      };
  }

  if (!$rootScope.$storage.allEquipes) {


    $rootScope.$storage.allEquipes = [
      {
        id: 901,
        nbNageur: 1,
        nom_club: "Dauphins (solo)"
      },

      {
        id: 902,
        nbNageur: 2,
        nom_club: "Dauphins (duo)"
      },

      {
        id: 903,
        nbNageur: 3,
        nom_club: "Dauphins (equipe)"
      },

      {
        id: 801,
        nbNageur: 1,
        nom_club: "Saumons (solo)"
      },

      {
        id: 802,
        nbNageur: 2,
        nom_club: "Saumons (duo)"
      },

      {
        id: 803,
        nbNageur: 3,
        nom_club: "Saumons (equipe)"
      }
    ];
  }


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

  $rootScope.$storage.tableauAffichage = $rootScope.$storage.tableauAffichage ? $rootScope.$storage.tableauAffichage :
    {
      Etapes: {
        Preliminaire: {
          Epreuves: {
            solo: [],
            duo: [],
            equipe: []
          }
        },
        Eliminatoire: {
          Epreuves: {
            solo: [],
            duo: [],
            equipe: []
          }
        },
        Finale: {
          Epreuves: {
            solo: [],
            duo: [],
            equipe: []
          }
        }
      }
    };


})
;
