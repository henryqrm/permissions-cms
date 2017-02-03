'use strict';

export function canContextCreate(Permission) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      canContextCreate: '@'
    },
    link: function ($scope, elem) {
      Permission
        .checkPermission($scope.canContextCreate)
        .then(roleCreateGroup => {
          console.log('context: ' + $scope.canContextCreate + ' LoadcanContextCreate: ', roleCreateGroup.c);
          if (!roleCreateGroup.c) {
            elem.remove();
          }
        });
    }
  };
}
