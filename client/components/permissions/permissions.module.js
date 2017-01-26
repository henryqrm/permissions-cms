import angular from 'angular';
import permission from './permissions.service.js'

export default angular.module('tempApp.Permissions', [])
  .factory('Permission', permission)
  .name;
