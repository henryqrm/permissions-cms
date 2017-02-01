'use strict';
export function Permission(Auth, $q, $log) {
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
          Auth.getCurrentContexts();
          if (user.permissions === undefined || user.permissions.length === 0) {
            $log.info('Usuário sem permissões');
            defer.resolve(setGroupPermissionsOnUser(context));
          } else {
            for (var i = 0; i < user.permissions.length; i++) {
              if (context === user.permissions[i].context) {
                user.permissions[i].items.forEach(item => {
                  var contextPermission = Auth.getContextPermission(context);
                  // set Permission custom
                  setTimeout(() => {
                    if (contextId === item.id) {
                      // console.log('count', count, context, contextId, 'user id context', item.id);
                      // console.log('Group: ', contextPermission);
                      // console.log('_User: ', item.roles);
                      var currentRolesByContext = {
                        c: item.roles.c === undefined ? contextPermission.c : item.roles.c,
                        r: item.roles.r === undefined ? contextPermission.r : item.roles.r,
                        u: item.roles.u === undefined ? contextPermission.u : item.roles.u,
                        d: item.roles.d === undefined ? contextPermission.d : item.roles.d,
                        p: item.roles.p === undefined ? contextPermission.p : item.roles.p
                      };
                      // Verify moderator
                      if (!currentRolesByContext.p) {
                        currentRolesByContext.p = isModerator(moderators, user.id);
                      }
                      // console.log('__New: ', currentRolesByContext);
                      defer.resolve(currentRolesByContext);
                    }
                  }, 0);
                });
              }
            }
          }
        }
      })
      .catch(() => {
        $log.error('User is not logged');
        defer.resolve({
          c: false,
          r: false,
          u: false,
          d: false,
          p: false
        });
      });
    return defer.promise;
    // isModerator(User.id, context);
  }

  function setGroupPermissionsOnUser(context) {
    return Auth.getContextPermission(context);
  }

  function isModerator(contextModeratorArray, userId) {
    for (var i = 0; i < contextModeratorArray.length; i++) {
      var moderatorId = contextModeratorArray[i];
      if (moderatorId === userId) {
        return true;
      }
    }
    return false;
  }

  function checkReadContext(context, moderators) {

  }

  function checkCreateContext() {

  }

  // Public API here
  return {
    checkPermission
  };
}
