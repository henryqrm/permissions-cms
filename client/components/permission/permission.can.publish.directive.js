'use strict';

export function canPublish(Permission) {
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
          console.log('id: ' + $scope.contextId + ' LoadcanPublish: ' + roles.p);
          if (!roles.p) {
            elem.remove();
          }
        });
    }
  };
}
