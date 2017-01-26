'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './user.routes';

export class UserComponent {
  Permission: Function;
  roles = {};
  /*@ngInject*/
  constructor(Permission) {
    this.roles = Permission.roles();
    this.message = 'Hello';
  }
  $onInit() {
    // console.log(this.roles);
  }
}

export default angular.module('tempApp.user', [uiRouter])
  .config(routes)
  .component('user', {
    template: require('./user.html'),
    controller: UserComponent
  })
  .name;
