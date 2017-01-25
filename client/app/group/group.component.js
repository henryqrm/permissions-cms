'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './group.routes';

export class GroupComponent {
  $http;
  socket;
  groups = [];
  newgroup = {};

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('group');
    });
  }

  $onInit() {
    this.$http.get('/api/groups')
      .then(response => {
        this.groups = response.data;
        this.socket.syncUpdates('group', this.groups);
      });
  }

  addgroup() {
    if (this.newgroup) {
      this.$http.post('/api/groups', {
        name: this.newgroup.name,
        info: this.newgroup.info,
        active: this.newgroup.active,
      });
      this.newgroup = {};
    }
  }

  deletegroup(group) {
    this.$http.delete(`/api/groups/${group._id}`);
  }
}

export default angular.module('tempApp.group', [uiRouter])
  .config(routes)
  .component('group', {
    template: require('./group.html'),
    controller: GroupComponent
  })
  .name;
