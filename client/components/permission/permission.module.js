'use strict';
import angular from 'angular';

import {
  Permission
} from './permission.service';

import {
  canCreate
} from './permission.can.create.directive';
import {
  canRead
} from './permission.can.read.directive';
import {
  canUpdate
} from './permission.can.update.directive';
import {
  canDelete
} from './permission.can.delete.directive';
import {
  canPublish
} from './permission.can.publish.directive';

import {
  canContextCreate
} from './permission.context.create.directive';

import {
  canContextRead
} from './permission.context.read.directive';

export default angular.module('tempApp.Permission', [])
  .factory('Permission', Permission)
  // .factory('Resource', Resource)
  .directive('canCreate', canCreate)
  .directive('canRead', canRead)
  .directive('canUpdate', canUpdate)
  .directive('canDelete', canDelete)
  .directive('canPublish', canPublish)
  .directive('canContextCreate', canContextCreate)
  .directive('canContextRead', canContextRead)
  .name;
