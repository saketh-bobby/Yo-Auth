(function () {
	'use strict';

	angular
		.module('yoAuthApp')
		.controller('LoginCtrl', LoginCtrl);


	function LoginCtrl($scope,alert,authService) {

		$scope.submit = function(){
			var user = {
				email:$scope.email,
				password:$scope.password
			};
			authService
				.login(user)
				.then(function(response){
					alert('success','Logged In Successfully!','Welcome '+response.user.email+'!');
				});
		};
	}

})();

