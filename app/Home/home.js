'use strict';

angular.module('myApp.home', ['ngRoute', 'ngStorage'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'Home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl',
  ['$scope', '$localStorage', '$sessionStorage', '$rootScope',
    function($scope, $localStorage, $sessionStorage, $rootScope) {

  //Rend toute les données de $scope.$storage persistante à travers les sessions
      $scope.$storage = $localStorage;

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

      //1 et 2 à fusionné ?

      $scope.allPages = [
        { "nom"   : "Login",
          "icon"  : "img/login.png",
          "url"   : "#!/Login",
          "roles" :[0,1,2,3,4,5]
        },

        { "nom"   : "Inscription Nageurs",
          "icon"  : "img/swimmers.png",
          "url"   : "#!/",
          "roles" :[0,4]
        },

        { "nom"   : "Notation d'un ballet",
          "icon"  : "img/grade.png",
          "url"   : "#!/NotationBallet",
          "roles" :[0,1,2]
        },

        { "nom"   : "Validation d'un ballet",
          "icon"  : "img/valid.png",
          "url"   : "#!/",
          "roles" :[0,3]
        },

        { "nom"   : "Ballet suivant",
          "icon"  : "img/next.png",
          "url"   : "#!/",
          "roles" :[0,3]
        },

        { "nom"   : "Tableau General",
          "icon"  : "img/score.png",
          "url"   : "#!/",
          "roles" :[0,1,2,3,4,5]
        }];



}]);
