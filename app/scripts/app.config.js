angular
  .module('yoAuthApp', ['ui.router'])
  .config(configFunction);

function configFunction($urlRouterProvider,$stateProvider){
  $stateProvider
  	.state('register',{
			url:'/register',
			templateUrl:'/views/register.html'
	  })
	  .state('main',{
	  	url:'/',
		  templateUrl:'/views/main.html'
	  });
	$urlRouterProvider.otherwise('/');
}
