'use strict';

export function canContextRead(Permission) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      canContextRead: '@'
    },
    link: function ($scope, elem) {
      Permission
        .checkPermission($scope.canContextRead)
        .then(roleReadGroup => {
          var rolerRead = !(!roleReadGroup.r && !(roleReadGroup.c || roleReadGroup.u || roleReadGroup.d || roleReadGroup.p));
          console.log('context: ' + $scope.canContextRead + ' LoadcanContextRead: ' + rolerRead);
          if (!rolerRead) {
            elem.remove();
            // elem.append('asdasd');
          }
        });
    }
  };
}
