(function () {
	'use strict';

	angular
		.module('yoAuthApp')
		.controller('LogoutCtrl', LogoutCtrl);


	function LogoutCtrl(authToken,$state) {

		authToken.removeToken();
		$state.go('main');

	}

})();

