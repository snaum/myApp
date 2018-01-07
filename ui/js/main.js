(function () {

  'use strict';

  /* Dependencies loading*/
  require('angular');
  require('angular-route');
  require('angular-animate');
  var mainCtrl = require('./controllers/mainctrl');
  //var loginCtrl = require('./controllers/login_ctrl');
  var authSrvc = require('./services/auth_srvc');

  /* Init the application. it all starts here */
  angular.module('SampleApp', ['ngRoute', 'ngAnimate'])

  /* Config section */
  .config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
      //$locationProvider.hashPrefix('!');
      $locationProvider.html5Mode(true);
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "./partials/partial1.html",
          controller: "MainController",
          controllerAs: "MainController"
        })
        .otherwise({
           redirectTo: '/'
        });
    }
  ])

  /* Load components */

  //the landing page controller
  .controller('MainController', ['$scope', mainCtrl])
  //the auth service stored the user data
  .factory('AuthService', [authSrvc])

  /* Start the application */
  .run();

}());
