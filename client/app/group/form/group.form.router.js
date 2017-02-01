'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('group.new', {
      url: '/group/new',
      template: '<group-form></group-form>',
      authenticate: true
    })
    .state('group.edit', {
      url: '/group/edit',
      template: '<group-form></group-form>',
      authenticate: true
    });
}
