'use strict';

angular.module('yoAuthApp')
  .factory('authToken', function ($window) {
		var cachedToken,storage = $window.localStorage;
  	return {
  		setToken:function(token){
  			cachedToken = token;
  			storage.setItem('userToken',token);
		  },
			getToken:function(){
				if(!cachedToken){
					cachedToken = storage.getItem('userToken');
				}
				return cachedToken;
			},
		  isAuthenticated:function(){
				return !!this.getToken();
		  }
		};
  });
