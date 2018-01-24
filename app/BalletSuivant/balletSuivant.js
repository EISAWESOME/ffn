'use strict';

angular.module('myApp.balletSuivant', ['ngRoute', 'ngStorage'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/BalletSuivant', {
            templateUrl: 'BalletSuivant/balletSuivant.html',
            controller: 'balletSuivantCtrl'
        });
    }])

    .controller('balletSuivantCtrl',
        ['$scope', '$localStorage', '$sessionStorage', '$rootScope', '$q', '$ngConfirm', '$window', 'ngToast',
            function ($scope, $localStorage, $sessionStorage, $rootScope, $q, $ngConfirm, $window, ngToast) {
                $scope.init = function () {

                    // Stocker les etape selectionné dans un tableau ?
                    // Pour etablir un ordre de passage ?

                    //Creer un toast dès qu'on ajoute un ballet à l'ordrede passage ?

                    $scope.selectedEtape = undefined;

                    $scope.selectedEpreuve = undefined;

                    $scope.selectedEquipe = undefined;
                    $scope.selectedEquipeNageurs = undefined;

                    $scope.selectedTypeBallet = undefined;

                    // Doit etre recuperer via l'api

                    $scope.allEquipes = $rootScope.$storage.allEquipes;


                };


                /**
                 * Ajoute une etape à l'odre de passage
                 * @param etape : l objet etape à ajouter
                 */
                $scope.selectEtape = function (etape) {

                    console.log(etape);
                    $scope.selectedEtape = etape;
                    $scope.epreuveEquipes = undefined;
                    $scope.selectedEpreuve = undefined;
                    $scope.selectedEquipe = undefined;
                    $scope.selectedTypeBallet = undefined;
                    // Il faut recuperer les equipes qui participe a cette epreuve, ainsi que le nom de leur club

                };

                /**
                 * Ajoute une epreuveà l'ordre de passage
                 * @param epreuve : l objet epreuve à ajouter
                 */
                $scope.selectEpreuve = function (epreuve) {

                    console.log(epreuve);
                    $scope.selectedEquipe = undefined;
                    $scope.selectedTypeBallet = undefined;
                    $scope.selectedEpreuve = epreuve;
                    $scope.epreuveEquipes = $scope.getEquipes(epreuve.nbNageur);
                    // Il faut recuperer les equipes qui participe a cette epreuve, ainsi que le nom de leur club

                };

                /**
                 * Ajoute une equipe à l'odre de passage
                 * @param idEpreuve : l identifiant de l'epreuve à laquelle l'equipe est rattaché ( pour l api)
                 * @param equipe : l objet equipe à ajouter
                 */
                $scope.selectEquipe = function (idEpreuve, equipe) {
                    $scope.selectedTypeBallet = undefined;
                    $scope.selectedEquipe = equipe;

                };

                /**
                 * Précise le type de ballet plannifié
                 * @param type : "Libre" ou "Impose"
                 */
                $scope.selectTypeBallet = function (type) {
                    $scope.selectedTypeBallet = type;
                    console.log($scope.selectedTypeBallet)

                };

                /**
                 *
                 * @param nbNageur : le nombre de nageur de l'equipe recherché
                 * @returns {Array.<T>} : retourne l'equipe contenant le nombre de nageur précisé
                 */
                $scope.getEquipes = function (nbNageur) {
                    console.log("On appelle l'API getEquipesByEpreuves! C'est pas en dur du tout");

                    var equipes = $scope.allEquipes.filter(function (x) {
                        return x.nbNageur == nbNageur;
                    });

                    console.log(equipes);

                    return equipes;
                };

                $scope.getEquipeIndex = function(){

                     var matchedIndex =  $rootScope.$storage.allEquipes.findIndex(function(eq){
                         return eq.id == $scope.selectedEquipe.id;
                     });

                     return matchedIndex;
                };


                /**
                 * Recupere le nombre d'attribut
                 * @param obj : objet a compter
                 * @returns {Number} : le nombre d'attribut
                 */
                $scope.getLength = function (obj) {

                    return Object.keys(obj).length;

                };


                /**
                 * Enregistre les item selectionné dans l'ordre de passage
                 */
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

                                    //Crée un ballet
                                    //A stocker dans la BDD en même temps
                                    //Si il y a deja 5 ballet dans la queue, l'API refuse de stocker

                                    $rootScope.$storage.ordrePassage.push({
                                        etape: $scope.selectedEtape,
                                        epreuve: $scope.selectedEpreuve,
                                        equipe: $scope.selectedEquipe,
                                        type: $scope.selectedTypeBallet,
                                        notes: {}
                                    });


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
