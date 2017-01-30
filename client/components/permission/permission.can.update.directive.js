'use strict';

export function canUpdate(Permission) {
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
          console.log('id: ' + $scope.contextId + ' LoadcanUpdate: ' + roles.u);
          if (!roles.u) {
            elem.remove();
          }
        });
    }
  };
}
