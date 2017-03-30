(function () {
	'use strict';

	angular
		.module('yoAuthApp')
		.controller('JobsCtrl', JobsCtrl);

	function JobsCtrl($scope,$http,alert) {
		$http
			.get('/jobs')
			.then(function(response){
				$scope.jobs = response.data;
			})
			.catch(function(err){
				alert('warning','Oops!',"Cannot retrieve")
			});
	}

})();

