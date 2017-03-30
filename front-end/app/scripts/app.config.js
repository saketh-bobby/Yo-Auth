'use strict';
angular
  .module('yoAuthApp', ['ui.router'])
  .config(configFunction);

function configFunction($urlRouterProvider,$stateProvider,$httpProvider){
  $stateProvider
  	.state('register',{
			url:'/register',
			templateUrl:'/views/register.html',
		  controller:'RegisterCtrl'
	  })
	  .state('jobs',{
		  url:'/jobs',
		  templateUrl:'/views/jobs.html',
		  controller:'JobsCtrl'
	  })
	  .state('main',{
	  	url:'/',
		  templateUrl:'/views/main.html'
	  })
	  .state('logout',{
		  url:'/logout',
		  controller:'LogoutCtrl'
	  });
	$urlRouterProvider.otherwise('/');

	$httpProvider.interceptors.push('authInterceptor');
}
