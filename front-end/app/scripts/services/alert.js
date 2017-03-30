'use strict';

angular.module('yoAuthApp')
  .service('alert', function ($rootScope,$timeout) {
	  var alertTimeout;
	  return function (type,title,message,timeout) {
			$rootScope.alert = {
				type:type,
				title:title,
				message:message,
				hasBeenShown:true,
				show:true
			};
			$timeout.cancel(alertTimeout);

			alertTimeout = $timeout(function(){
				$rootScope.alert.show = false;
			},timeout || 2000);

		};
  });
