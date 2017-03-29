'use strict';

/**
 * @ngdoc directive
 * @name yoAuthApp.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('yoAuthApp')
  .directive('sameAs', function () {
    return {
			require:'ngModel',
      link: function postLink(scope, element, attrs,ngModelCtrl) {
				function validateEquals(value){
					var valid = (scope.$eval(attrs.validateEquals) === value);
					ngModelCtrl.$setValidity('equal',valid);
					return valid ? value : undefined;
				}
				ngModelCtrl.$parsers.push(validateEquals);
				ngModelCtrl.$formatters.push(validateEquals);
      }
    };
  });
