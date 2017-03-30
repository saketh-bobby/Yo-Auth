(function () {
	'use strict';

	angular
		.module('yoAuthApp')
		.service('authService', authService);


	function authService($state,$http,authToken) {
		this.login = function(user){
			return $http
				.post('/login',user)
				.then(function(response){
					authToken.setToken(response.data.token);
					$state.go('main');
					return response.data;
				});
		};

		this.register = function(user){
			return $http
				.post('/register',user)
				.then(function(response){
					authToken.setToken(response.data.token);
					$state.go('main');
					return response.data;
				});

		};
	}

})();

