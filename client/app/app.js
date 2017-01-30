'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
// require('textangular/dist/textAngular-sanitize.min');
// import textAngular from 'textangular';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import UserComponent from './user/user.component';
import GroupComponent from './group/group.component';
import ResourceComponent from './resource/resource.component';
import PageComponent from './page/page.component';
import EventsComponent from './events/events.component';

import PermissionModule from '../components/permission/permission.module';

import 'v-accordion';
import ngAnimate from 'angular-animate';
import './app.scss';

angular.module('tempApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter, 'vAccordion', ngAnimate,
    uiBootstrap, _Auth, account, admin, navbar, footer, main, constants, socket, util, UserComponent, GroupComponent,
    ResourceComponent, PageComponent, EventsComponent, PermissionModule
  ])
  .config(routeConfig)
  .run(function ($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedIn(function (loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['tempApp'], {
      strictDi: true
    });
  });
