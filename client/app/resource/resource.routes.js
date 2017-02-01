'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('resource', {
      url: '/resource',
      template: '<resource></resource>',
      authenticate: true
    });
}
