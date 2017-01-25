'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './user.routes';

export class UserComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('tempApp.user', [uiRouter])
  .config(routes)
  .component('user', {
    template: require('./user.html'),
    controller: UserComponent,
    controllerAs: 'userCtrl'
  })
  .name;
