'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('page', {
      url: '/page',
      template: '<page></page>',
      authenticate: true
    });
}
