'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './events.routes';

export class EventsComponent {
  $http;
  socket;
  events = [];
  newevent = {};

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('event');
    });
  }

  $onInit() {
    this.$http.get('/api/events')
      .then(response => {
        this.events = response.data;
        this.socket.syncUpdates('event', this.events);
      });
  }

  addevent() {
    if (this.newevent) {
      this.$http.post('/api/events', {
        id: this.newevent.id,
        text: this.newevent.text,
        context: 'event',
        // moderators: [String],
        status: 'moderator',
        title: this.newevent.title,
        active: this.newevent.active,
      });
      this.newevent = {};
    }
  }
  edit(index) {
    this.isEdit = true;
    this.newevent = this.events[index];
  }
  saveEdit() {
    this.$http.put(`/api/events/${this.newevent._id}`, this.newevent)
      .then(() => {
        this.isEdit = false;
        this.newevent = {};
      });
  }
  publish(event) {
    event.status = event.status === 'moderator' ? 'published' : 'moderator';
    this.$http.put(`/api/events/${event._id}`, event);
  }

  deleteevent(event) {
    this.$http.delete(`/api/events/${event._id}`);
  }
}

export default angular.module('tempApp.events', [uiRouter])
  .config(routes)
  .component('events', {
    template: require('./events.html'),
    controller: EventsComponent
  })
  .name;
