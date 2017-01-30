'use strict';

export function canCreate(Permission) {
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
          console.log('id: ' + $scope.contextId + ' LoadCanCreate: ' + roles.c);
          if (!roles.c) {
            elem.remove();
          }
        });
    }
  };
}
