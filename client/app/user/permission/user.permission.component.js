'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './user.permission.router';

export class PermissionComponent {
  $http;
  socket;
  users = [];
  newresource = {};
  userPermission = [];

  /*@ngInject*/
  constructor($http, $scope, socket, $q, $stateParams) {
    this.$q = $q;
    this.$http = $http;
    this.socket = socket;
    this.$stateParams = $stateParams;
    this.contexts = [];
    this.permission = [];
    this.user = {};
  }

  $onInit() {
    this.getContexts();
  }

  getUser() {
    this.$http.get(`/api/users/${this.$stateParams.userId}`)
      .then(response => {
        this.user = response.data;
        this.getResourceByGroup(this.user.group);
      });
  }

  edit(resource) {
    this.$http.put(`/api/resources/${resource._id}`, this.user);
  }

  getResourceByGroup(group) {
    this.$http.get('/api/resources')
      .then(response => {
        for (var i = 0; i < response.data.length; i++) {
          var resource = response.data[i];
          if (group === resource.group) {
            this.permission = resource.contexts;
            this.makeViewModelPermission();
          }
        }
      });
  }

  makeViewModelPermission() {
    for (var i = 0; i < this.contexts.length; i++) {
      var context = this.contexts[i];
      for (var j = 0; j < this.permission.length; j++) {
        var permission = this.permission[j];
        if (context.context === permission.name) {
          for (var k = 0; k < context.items.length; k++) {
            var item = context.items[k];
            var currentRoles = angular.copy(permission.roles);
            item.roles = this.mergePermissionWithUser(item.id, item.context, currentRoles, item.moderators);
          }
        }
      }
    }
  }

  setPermission(contextName, contextId, roles) {
    var newPermission = [];
    var isNewContext = false;
    var isNewItem = false;
    var isUpdateItem = false;
    this.user.permissions = this.user.permissions === undefined ? {} : this.user.permissions;

    // function verifyAndCreateContext() {
    //   var isNewContext = false;
    //   for (var i = 0; i < this.user.permissions.length; i++) {
    //     var context = this.user.permissions[i];
    //     if (context.context === context) {
    //       isNewContext = true;
    //     }
    //   }

    //   if (isNewContext) {

    //   }
    // }
    // console.log(verifyAndCreateContext());

    if (this.user.permissions.length === 0) {
      console.log('Não existe role para:', contextName, contextId);
      this.user.permissions.push(this.newRole(contextName, contextId, roles));
      // return;
    } else {
      loop: for (var i = 0; i < this.user.permissions.length; i++) {
        var permission = this.user.permissions[i];
        if (permission.context === contextName) {
          isNewContext = true;
          for (var j = 0; j < permission.items.length; j++) {
            var item = permission.items[j];
            if (item.id === contextId) {
              isNewItem = true;
              console.log('update');
              // console.log('Update Item', contextName, contextId);
              item.roles = angular.merge(item.roles, roles);
              break loop;
            }
          }
          if (!isNewItem) {
            console.log('novo item', contextName, contextId);
            permission.items.push(this.newItemRole(contextId, roles));
          }
        }
      }

      if (!isNewContext) {
        console.log('novo context');
        this.user.permissions.push(this.newRole(contextName, contextId, roles));
      }
    }
    console.log(this.user);
    this.$http.put(`/api/users/${this.user._id}`, this.user);
  }


  newItemRole(contextId, roles) {
    return {
      id: contextId,
      roles: roles
    };
  }

  newRole(contextName, contextId, roles) {
    return {
      context: contextName,
      items: [{
        id: contextId,
        roles: roles
      }]
    };
  }

  mergePermissionWithUser(contextId, context, roles, moderators) {
    var currentRolesByContext = {};
    if (this.user.permissions !== undefined || this.user.permissions.length !== 0) {
      for (var i = 0; i < this.user.permissions.length; i++) {
        var permission = this.user.permissions[i];
        if (context === permission.context) {
          for (var j = 0; j < permission.items.length; j++) {
            var item = permission.items[j];
            if (contextId === item.id) {
              // console.log('ITEM', item);
              currentRolesByContext = {
                c: item.roles.c === undefined ? roles.c : item.roles.c,
                r: item.roles.r === undefined ? roles.r : item.roles.r,
                u: item.roles.u === undefined ? roles.u : item.roles.u,
                d: item.roles.d === undefined ? roles.d : item.roles.d,
                p: item.roles.p === undefined ? roles.p : item.roles.p
              };
              // Verify moderator
              if (!currentRolesByContext.p) {
                currentRolesByContext.p = this.isModerator(moderators, this.user.id);
              }
              return currentRolesByContext;
            }
          }
        }
      }
    }
    return roles;
  }

  isModerator(contextModeratorArray, userId) {
    for (var i = 0; i < contextModeratorArray.length; i++) {
      var moderatorId = contextModeratorArray[i];
      if (moderatorId === userId) {
        return true;
      }
    }
    return false;
  }

  getContexts() {
    this.$http.get('/api/pages')
      .then(response => {
        this.contexts.push({
          context: 'page',
          items: response.data
        });
        this.$http.get('/api/events')
          .then(response => {
            this.contexts.push({
              context: 'event',
              items: response.data
            });
            this.getUser();
          });
      });
  }
}

export default angular.module('tempApp.user.permission', [uiRouter])
  .config(routes)
  .component('permission', {
    template: require('./user.permission.html'),
    controller: PermissionComponent
  })
  .name;
