'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import permission from './permission/user.permission.component';
import userForm from './form/user.form.component';

import routes from './user.routes';

export class UserComponent {
  $http;
  socket;
  users = [];
  newresource = {};

  /*@ngInject*/
  constructor($http, $scope, socket, $q) {
    this.$q = $q;
    this.$http = $http;
    this.socket = socket;
    this.contexts = [];

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('user');
    });
  }

  $onInit() {
    this.$http.get('/api/users')
      .then(response => {
        this.users = response.data;
        this.socket.syncUpdates('user', this.users);
      });
  }

  adduser() {
    if (this.newuser) {
      this.$http.post('/api/users', {
        name: this.newuser.name,
        info: this.newuser.info,
        active: this.newuser.active,
      });
      this.newuser = {};
    }
  }

  deleteresource(resource) {
    this.$http.delete(`/api/users/${resource._id}`);
  }
}

export default angular.module('tempApp.user', [uiRouter, permission, userForm])
  .config(routes)
  .component('user', {
    template: require('./user.html'),
    controller: UserComponent
  })
  .name;
