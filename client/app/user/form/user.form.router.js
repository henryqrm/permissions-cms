'use strict';


export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('usercreate', {
      url: '/create',
      template: '<userform></userform>',
    });
}
