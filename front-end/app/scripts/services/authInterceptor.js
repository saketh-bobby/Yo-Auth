(function () {
	'use strict';

	angular
		.module('yoAuthApp')
		.factory('authInterceptor', authInterceptor);


	function authInterceptor(authToken) {
		return {
			request:function(config){
				var token = authToken.getToken();
				if(token){
					config.headers.Authorization = 'Bearer '+token;
				}
				return config;
			},
			response:function(response){
				return response;
			}
		};

	}

})();

