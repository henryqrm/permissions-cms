'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './resource.routes';

export class ResourceComponent {
  $http;
  socket;
  resources = [];
  newresource = {};

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('resource');
    });
  }

  $onInit() {
    this.$http.get('/api/resources')
      .then(response => {
        this.resources = response.data;
        console.log(this.resources);
        this.socket.syncUpdates('resource', this.resources);
      });
  }

  addresource() {
    if (this.newresource) {
      this.$http.post('/api/resources', {
        name: this.newresource.name,
        info: this.newresource.info,
        active: this.newresource.active,
      });
      this.newresource = {};
    }
  }
  edit(resource) {
    this.$http.put(`/api/resources/${resource._id}`, resource);
  }

  deleteresource(resource) {
    this.$http.delete(`/api/resources/${resource._id}`);
  }
}

export default angular.module('tempApp.resource', [uiRouter])
  .config(routes)
  .component('resource', {
    template: require('./resource.html'),
    controller: ResourceComponent
  })
  .name;
