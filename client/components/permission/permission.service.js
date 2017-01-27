'use strict';
import angular from 'angular';

export function Permission(Auth, $q, $log, $http) {
  'ngInject';
  console.time('Permissão:');
  var getUser = Auth.getCurrentUser;
  var _User = null;

  var permissionsInMemory = [];
  var inMemory = {
    context: '',
    contextId: '',
    roles: {
      c: false,
      r: false,
      u: false,
      d: false,
      p: false
    }
  };


  function checkPermission(context, contextId, moderators) {
    var defer = $q.defer();
    if (!context && !contextId) {
      $log.error('context/contextId não definido');
      defer.resolve(false);
      return defer.promise;
    }
    getUser()
      .then(user => {
        if (user.isAdmin) {
          defer.resolve({
            c: true,
            r: true,
            u: true,
            d: true,
            p: true
          });
        } else {
          console.log(user.permissions.length);
          if (user.permissions.length === 0) {
            $log.info('Usuário sem permissões');
            Auth.getCurrentContexts();
            defer.resolve(Auth.getContextPermission(context));
          } else {
            $log.error('asdasdasd');

            user.permissions.forEach(permission => {
              if (context === permission.context) {
                permission.items.forEach(item => {
                  var contextPermission = Auth.getContextPermission(context);
                  // set Permission custom
                  setTimeout(() => {
                    if (contextId === item.id) {
                      console.log('Group: ', contextPermission);
                      console.log('_User: ', item.roles);
                      var currentRolesByContext = {
                        c: item.roles.c === undefined ? contextPermission.c : item.roles.c,
                        r: item.roles.r === undefined ? contextPermission.r : item.roles.r,
                        u: item.roles.u === undefined ? contextPermission.u : item.roles.u,
                        d: item.roles.d === undefined ? contextPermission.d : item.roles.d,
                        p: item.roles.p === undefined ? contextPermission.p : item.roles.p
                      };
                      console.log('__New: ', currentRolesByContext);
                      defer.resolve(currentRolesByContext);
                      console.timeEnd('Permissão:');
                    }
                    // Verify moderator
                    // if (!roles.p) {
                    //   roles.p = isModerator(moderators, user.id);
                    // }
                    // defer.reject({});
                  }, 0);
                });
              }
            });
          }
        }
      });
    return defer.promise;
    // isModerator(User.id, context);
  }

  function isModerator(contextModeratorArray, userId) {
    for (var i = 0; i < contextModeratorArray.length; i++) {
      var moderatorId = contextModeratorArray[i];
      if (moderatorId === userId) {
        return true;
      }
    }
  }

  // Public API here
  return {
    checkPermission
  };
}

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
          if (roles.c !== undefined && !roles.c) {
            elem.remove();
          }
        });
    }
  };
}

export function canDelete(Permission) {
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
          console.log('id: ' + $scope.contextId + ' LoadCanDelete: ' + roles.d);
          if (!roles.d) {
            elem.remove();
          }
        });
    }
  };
}
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

export default angular.module('tempApp.Permission', [])
  .factory('Permission', Permission)
  .directive('canCreate', canCreate)
  .directive('canDelete', canDelete)
  .directive('canPublish', canPublish)
  .directive('canRead', canRead)
  .directive('canUpdate', canUpdate)
  .name;
