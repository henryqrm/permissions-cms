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
          console.log(roles);
          var rolerRead = !(!roles.r && !(roles.c || roles.u || roles.d || roles.p));
          console.log('id: ' + $scope.contextId + ' LoadcanRead: ' + rolerRead);
          if (!rolerRead) {
            elem.remove();
          }
        });
    }
  };
}
