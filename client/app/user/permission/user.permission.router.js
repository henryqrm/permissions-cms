'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('permission', {
      url: '/user/permission/{userId}',
      template: '<permission></permission>'
    });
}
