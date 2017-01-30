'use strict';

export function canReadPage(Permission) {
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
        .checkReadPage($scope.context, $scope.moderadors)
        .then(pageRead => {
          console.log('id: ' + $scope.context + ' LoadcanReadPage: ' + pageRead);
          if (!pageRead) {
            elem.remove();
          }
        })
        .catch(() => {
          console.log('id: ' + $scope.context + ' LoadcanReadPage: ' + false);
          elem.remove();
        });
    }
  };
}
