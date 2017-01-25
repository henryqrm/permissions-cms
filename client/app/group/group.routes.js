'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('group', {
      url: '/group',
      template: '<group></group>'
    });
}
