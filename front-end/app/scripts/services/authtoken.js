'use strict';

angular.module('yoAuthApp')
  .factory('authToken', function ($window,$rootScope) {
		var cachedToken,storage = $window.localStorage;
  	var authToken = {
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
				return !!authToken.getToken();
		  },
		  removeToken:function(){
		  	storage.removeItem('userToken');
		  	cachedToken = null;
		  }
	  };

	  return authToken;

  });
