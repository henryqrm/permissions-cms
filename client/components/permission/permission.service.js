'use strict';
export function Permission(Auth, $q, $log) {
  'ngInject';
  console.time('Permissão:');
  var getUser = Auth.getCurrentUser;

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
          var contextPermission = setGroupPermissionsOnUser(context);
          if (!contextId && moderators === undefined) {
            setTimeout(() => {
              var read = contextPermission.r;
              console.log(hasPermission(user.permissions, context));
              if (!read) {
                read = hasPermission(user.permissions, context);
              }
              console.log('ITEM', context, read);
              console.log('Group Role', contextPermission);
              defer.resolve({
                c: contextPermission.c,
                r: read,
                u: contextPermission.u,
                d: contextPermission.d,
                p: contextPermission.p
              });
            }, 0);
          }
          if (user.permissions === undefined || user.permissions.length === 0) {
            var moderator = contextPermission.p;
            if (!moderator) {
              moderator = isModerator(moderators, user.id);
            }
            defer.resolve({
              c: contextPermission.c,
              r: contextPermission.r,
              u: contextPermission.u,
              d: contextPermission.d,
              p: moderator
            });
          } else {
            for (var i = 0; i < user.permissions.length; i++) {
              if (context === user.permissions[i].context) {
                user.permissions[i].items.forEach(item => {
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
                      console.log('É moderator?', !currentRolesByContext.p);
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

        Auth.getCurrentContexts();
        var contextPermission = setGroupPermissionsOnUser(context);
        defer.resolve(contextPermission);
      });
    return defer.promise;
  }

  function hasPermission(permissions, context) {
    var has = false;
    console.log('HAS', has);
    loop: for (var i = 0; i < permissions.length; i++) {
      var permission = permissions[i];
      if (context === permission.context) {
        for (var j = 0; j < permission.items.length; j++) {
          var roles = permission.items[j].roles;
          has = (roles.c && roles.r && roles.u && roles.d && roles.p);
          if (has) {
            break loop;
          }
        }
      }
    }
    return has;
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

  // Public API here
  return {
    checkPermission
  };
}
