'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

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
        console.log(this.users);
        this.socket.syncUpdates('user', this.users);
      });
    this.getContexts();
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
  edit(user) {
    this.$http.put(`/api/users/${user._id}`, user);
  }

  deleteresource(resource) {
    this.$http.delete(`/api/users/${resource._id}`);
  }

  show() {
    console.log(this.contexts);
  }

  setCanCreate() {

  }

  setCanRead(userId, context) {

  }

  setCanUpdate() {

  }

  setCanDelete() {

  }

  setCanPublish() {

  }

  getContexts() {
    this.$http.get('/api/pages')
      .then(response => {
        this.contexts.push({
          context: 'page',
          items: response.data
        });
      });

    this.$http.get('/api/events')
      .then(response => {
        this.contexts.push({
          context: 'event',
          items: response.data
        });
      });
  }
}

export default angular.module('tempApp.user', [uiRouter])
  .config(routes)
  .component('user', {
    template: require('./user.html'),
    controller: UserComponent
  })
  .name;
