'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './user.form.router';

export class UserFormComponent {
  $http;
  socket;
  users = [];
  newresource = {};

  /*@ngInject*/
  constructor($http, $scope, socket, $q, $state) {
    this.$q = $q;
    this.$http = $http;
    this.socket = socket;
    this.$state = $state;
    this.newuser = {};
    this.newuser.moderators = [];
  }

  $onInit() {
    this.getGroups();
    this.getModeradores();
  }
  save() {
    this.newuser.provider = 'local';
    this.newuser.password = '123456';
    this.newuser.moderators = this.newuser.moderators.map(Number);
    this.$http.post('api/users', this.newuser)
      .then(() => {
        this.$state.go('user');
      });
  }
  getModeradores() {
    this.$http.get('api/users')
      .then(response => {
        this.users = response.data;
      });
  }
  getGroups() {
    this.$http.get('api/groups')
      .then(response => {
        this.groups = response.data;
        console.log(this.groups);
      });
  }
}

export default angular.module('tempApp.user.form', [uiRouter])
  .config(routes)
  .component('userform', {
    template: require('./user.form.html'),
    controller: UserFormComponent,
  })
  .name;
