(function () {
	'use strict';

	angular
		.module('yoAuthApp')
		.controller('HeaderCtrl', HeaderCtrl);


	function HeaderCtrl($scope,authToken) {
		$scope.isAuthenticated = authToken.isAuthenticated;
	}

})();

