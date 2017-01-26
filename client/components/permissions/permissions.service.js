'use strict';

export function permission(Auth) {
  'ngInject'
  var isLoggedIn = Auth.isLoggedInSync;
  var isAdmin = Auth.isAdminSync;
  var currentUser = Auth.getCurrentUserSync;
  var rolesCurrent = {};

  function isAdmin() {
    if (currentUser.isAdmin) {
      rolesCurrent = {
        c: true,
        r: true,
        u: true,
        d: true,
        p: true
      };
      return true;
    }
    return false;
  }

  function canUpdate() {
    return rolesCurrent.u ? true : false;
  }

  function canDelete() {
    return rolesCurrent.d ? true : false;
  }

  function canCreate() {
    return rolesCurrent.c ? true : false;
  }

  function canRemove() {
    return rolesCurrent.r ? true : false;
  }

  function canPublish() {
    return rolesCurrent.p ? true : false;
  }
  function roles(){
      return rolesCurrent;
  }

  return {
    canUpdate,
    canDelete,
    canCreate,
    canRemove,
    canPublish,
    roles
  };
}
