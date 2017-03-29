'use strict';
angular.module('yoAuthApp')
  .controller('RegisterCtrl', function ($scope,$http,alert) {
    $scope.submit = function(){
			var url = '/';
			var user = {};
    	$http
				.post(url,user)
		    .then(function(response){
			    alert('success','Ok!','You are registered');
		    })
		    .catch(function(err){
					alert('warning','Oops!','Couldn\'t register');
		    });
    }
  });
