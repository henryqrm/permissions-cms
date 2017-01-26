'use strict';
import angular from 'angular';

export function Permission(Auth, $q, $log, $http) {
  'ngInject';
  var getUser = Auth.getCurrentUser;

  function mergeGroupPermissions() {
    resources.forEach(permissionSuper => {
      if (currentUser.group === permissionSuper.group) {
        delete permissionSuper.group;
        currentUser.permissions.forEach((permissionUser, index) => {
          if (permissionUser.context === permissionSuper.permissions[0].context) {
            const copy = Object.assign(permissionSuper.permissions[0].roles, permissionUser.items[0].roles);
            currentUser.permissions[index].items[0].roles = copy;
            // console.log();
            // console.log(currentUser.permissions[index].items[0].roles);
            // console.log();
          }
          // currentUser.permissions[index] = copy;
          // console.log(permissionSuper.permissions);
        });
      }
    });
  }

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
          user.permissions.forEach(permission => {
            if (context === permission.context) {
              permission.items.forEach(item => {
                var roles = {};
                // set Permission resource group
                $http.get('/api/resources')
                  .then(response => {
                    var resources = response.data;
                    for (var i = 0; i < resources.length; i++) {
                      var resource = response.data[i];
                      if (resource.group === user.group) {
                        for (var j = 0; j < resource.contexts.length; j++) {
                          var resourceContext = resource.contexts[j];
                          if (resourceContext.name === context) {
                            // set Permission custom
                            if (contextId === item.id) {
                              roles = {
                                c: item.roles.c === undefined ? resourceContext.roles.c : item.roles.c,
                                r: item.roles.r === undefined ? resourceContext.roles.r : item.roles.r,
                                u: item.roles.u === undefined ? resourceContext.roles.u : item.roles.u,
                                d: item.roles.d === undefined ? resourceContext.roles.d : item.roles.d,
                                p: item.roles.p === undefined ? resourceContext.roles.p : item.roles.p
                              };
                            }
                            // Verify moderator
                            if (!roles.p) {
                              roles.p = isModerator(moderators, user.id);
                            }
                            defer.resolve(roles);
                          }
                        }
                      }
                    }
                  });
              });
            }
          });
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

  function canUpdate() {
    var defer = $q.defer();
    defer.resolve(true);
    return defer.promise;
  }

  function canDelete() {
    var defer = $q.defer();
    getUser()
      .then(user => {
        defer.resolve(user.isAdmin);
      });
    return defer.promise;
  }

  function canCreate() {
    var defer = $q.defer();
    getUser()
      .then(user => {
        defer.resolve(user.isAdmin);
      });
    return defer.promise;
  }

  function canRemove() {
    var defer = $q.defer();
    defer.resolve(true);
    return defer.promise;
  }

  function canPublish() {
    var defer = $q.defer();
    defer.resolve(true);
    return defer.promise;
  }

  function roles() {
    var defer = $q.defer();
    defer.resolve(true);
    return defer.promise;
  }

  function getRoles() {
    var defer = $q.defer();
    // checkPermission('context', );
    defer.resolve(true);
    return defer.promise;
  }

  // Public API here
  return {
    canUpdate,
    canDelete,
    canCreate,
    canRemove,
    canPublish,
    checkPermission,
    roles,
    getRoles
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
          console.log('LoadCanCreate: ' + roles.c);
          if (!roles.c) {
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
          console.log('LoadCanDelete: ' + roles.d);
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
      console.log($scope.context, $scope.contextId, $scope.moderadors);
      Permission
        .checkPermission($scope.context, $scope.contextId, $scope.moderadors)
        .then(roles => {
          console.log(roles);
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
          console.log('LoadcanRead: ' + roles.r);
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
          console.log('LoadcanUpdate: ' + roles.u);
          if (!roles.u) {
            elem.remove();
          }
        });
    }
  };
}
export default angular.module('tempApp.Permission', [])
  .factory('Permission', Permission)
  // .directive('canCreate', canCreate)
  // .directive('canDelete', canDelete)
  // .directive('canPublish', canPublish)
  // .directive('canRead', canRead)
  // .directive('canUpdate', canUpdate)
  .name;
