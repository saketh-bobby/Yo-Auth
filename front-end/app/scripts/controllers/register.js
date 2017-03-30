'use strict';
angular.module('yoAuthApp')
  .controller('RegisterCtrl', function ($scope,$http,alert,authToken) {
    $scope.submit = function(){
			var url = '/register';
			var user = {
				email:$scope.email,
				password:$scope.password
			};
    	$http
				.post(url,user)
		    .then(function(response){
			    alert('success','Ok!','You are registered');
			    authToken.setToken(response.data.token);
		    })
		    .catch(function(err){
					alert('warning','Oops!','Couldn\'t register');
		    });
    }
  });
