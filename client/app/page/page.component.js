'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './page.routes';

export class PageComponent {
  $http;
  socket;
  pages = [];
  newpage = {};

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('page');
    });
  }

  $onInit() {
    this.$http.get('/api/pages')
      .then(response => {
        this.pages = response.data;
        this.socket.syncUpdates('page', this.pages);
      });
  }

  addpage() {
    if (this.newpage) {
      this.$http.post('/api/pages', {
        id: this.newpage.id,
        text: this.newpage.text,
        context: 'page',
        // moderators: [String],
        status: 'moderator',
        title: this.newpage.title,
        active: this.newpage.active,
      });
      this.newpage = {};
    }
  }
  edit(index) {
    this.isEdit = true;
    this.newpage = this.pages[index];
  }
  saveEdit() {
    this.$http.put(`/api/pages/${this.newpage._id}`, this.newpage)
      .then(() => {
        this.isEdit = false;
        this.newpage = {};
      });
  }
  publish(page) {
    page.status = page.status === 'moderator' ? 'published' : 'moderator';
    this.$http.put(`/api/pages/${page._id}`, page);
  }

  deletepage(page) {
    this.$http.delete(`/api/pages/${page._id}`);
  }
}

export default angular.module('tempApp.page', [uiRouter])
  .config(routes)
  .component('page', {
    template: require('./page.html'),
    controller: PageComponent
  })
  .name;
