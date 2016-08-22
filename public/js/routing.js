var pongbot = angular
   .module('pongbot', [
       'ngAnimate',
       'ngResource',
       'ngSanitize',
       'firebase',
       'ui.router',
   ])
   .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
   $stateProvider
       .state('home', {
           url: '/',
           templateUrl: 'views/home.html',
           controller: 'HomeController'
       });

        $urlRouterProvider.otherwise("/");
       $locationProvider.html5Mode(true);
   });
