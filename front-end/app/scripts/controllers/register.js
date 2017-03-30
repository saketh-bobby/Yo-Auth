'use strict';
angular.module('yoAuthApp')
  .controller('RegisterCtrl', function ($scope,alert,authService) {
    $scope.submit = function(){
			var user = {
				email:$scope.email,
				password:$scope.password
			};
			authService
				.register(user)
				.then(function(response){
			    alert('success','Account Created!','Welcome, '+response.user.email+'!');
		    })
		    .catch(function(err){
					alert('warning','Oops!','Couldn\'t register');
		    });
    }
  });
