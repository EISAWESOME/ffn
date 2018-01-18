'use strict';

angular.module('myApp.login', ['ngRoute', 'ngStorage'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/Login', {
      templateUrl: 'Login/login.html',
      controller: 'LoginCtrl'
    });
  }])

  .controller('LoginCtrl',
    ['$scope', '$localStorage', '$sessionStorage', '$rootScope', '$window',
      function ($scope, $localStorage, $sessionStorage, $rootScope, $window) {
        $scope.loginError = undefined;
        $scope.model = {
            ndc : "",
            mdp : ""
        };

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
        $scope.init = function(){

        };

        $scope.submit = function(){
            if($scope.formLogin.$valid){
                switch($scope.model.ndc){
                    case "admin":
                        if($scope.model.mdp == "admin"){
                            $rootScope.$storage.ndc = $scope.model.ndc;
                            $rootScope.$storage.role_id = 0;
                            $rootScope.$storage.role_name = "Admin";
                        } else {
                            $scope.loginError = "Login ou mot de passe incorrect !";
                        }
                        break;
                    case "jexec":
                        if($scope.model.mdp == "jexec"){
                            $rootScope.$storage.ndc = $scope.model.ndc;
                            $rootScope.$storage.role_id = 11;
                            $rootScope.$storage.role_name = "Juge Execution";
                        } else {
                            $scope.loginError = "Login ou mot de passe incorrect !";
                        }
                        break;
                    case "jarti":
                        if($scope.model.mdp == "jarti"){
                            $rootScope.$storage.ndc = $scope.model.ndc;
                            $rootScope.$storage.role_id = 12;
                            $rootScope.$storage.role_name = "Juge Artistique";
                        } else {
                            $scope.loginError = "Login ou mot de passe incorrect !";
                        }
                        break;
                    case "jdiff":
                        if($scope.model.mdp == "jdiff"){
                            $rootScope.$storage.ndc = $scope.model.ndc;
                            $rootScope.$storage.role_id = 13;
                            $rootScope.$storage.role_name = "Juge Difficulté";
                        } else {
                            $scope.loginError = "Login ou mot de passe incorrect !";
                        }
                        break;
                    case "jelem":
                        if($scope.model.mdp == "jelem"){
                            $rootScope.$storage.ndc = $scope.model.ndc;
                            $rootScope.$storage.role_id = 2;
                            $rootScope.$storage.role_name = "Juge Element";
                        } else {
                            $scope.loginError = "Login ou mot de passe incorrect !";
                        }
                        break;
                    case "jarbi":
                        if($scope.model.mdp == "jarbi"){
                            $rootScope.$storage.ndc = $scope.model.ndc;
                            $rootScope.$storage.role_id = 3;
                            $rootScope.$storage.role_name = "Juge Arbitre";
                        } else {
                            $scope.loginError = "Login ou mot de passe incorrect !";
                        }
                        break;
                    default :
                        $scope.loginError = "Login ou mot de passe incorrect !";
                        break;
                }
                if($rootScope.$storage.role_id || $rootScope.$storage.role_id == 0){
                    console.log($rootScope.$storage);
                    $rootScope.allPages[0] =
                    {
                        "nom": "Deconnexion",
                        "icon": "img/logout.png",
                        "url": "#!/",
                        "roles": [0, 11, 12, 13, 2, 3, 4, 5]
                    };
                    $window.location.href = "http://" + $window.location.host + "/app/#!/";
                }
            }

        }


      }]);
