'use strict';

export function canRead(Permission) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      context: '@',
      contextId: '=',
      moderadors: '='
    },
    link: function ($scope, elem, attr) {
      Permission
        .checkPermission($scope.context, $scope.contextId, $scope.moderadors)
        .then(roles => {
          console.log('id: ' + $scope.contextId + ' LoadcanRead: ' + roles.r);
          if (!roles.r) {
            elem.remove();
          }
        });
    }
  };
}
