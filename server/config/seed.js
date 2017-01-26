/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Group from '../api/group/group.model';
import Resource from '../api/resource/resource.model';
import Page from '../api/page/page.model';

Page.find({}).remove()
  .then(() => {
    Page.create({
      id: 0,
      title: 'Página Um',
      text: 'Está é a página 1',
      context: 'page',
      status: 'moderator',
      moderators: [33],
      active: true
    }, {
      id: 1,
      title: 'Página Dois',
      text: 'Isso é a página dois',
      context: 'page',
      status: 'published',
      moderators: [33],
      active: true
    });
  });

Resource.find({}).remove()
  .then(() => {
    Resource.create({
      group: 'Registrado',
      contexts: [{
        name: 'page',
        roles: {
          c: false,
          r: true,
          u: false,
          d: false,
          p: false
        }
      }, {
        name: 'event',
        roles: {
          c: true,
          r: false,
          u: false,
          d: false,
          p: false
        }
      }]
    }, {
      group: 'Autor',
      contexts: [{
        name: 'event',
        roles: {
          c: true,
          r: true,
          u: false,
          d: false,
          p: false
        }
      }, {
        name: 'page',
        roles: {
          c: true,
          r: true,
          u: false,
          d: false,
          p: false
        }
      }]
    }, {
      group: 'Editor',
      contexts: [{
        name: 'page',
        roles: {
          c: true,
          r: true,
          u: false,
          d: false,
          p: false
        }
      }]
    });
  });

Group.find({}).remove()
  .then(() => {
    Group.create({
      name: 'Registrado',
      info: 'Usuários registrados',
      active: true
    }, {
      name: 'Autor',
      info: 'Usuários registrados',
      active: true
    }, {
      name: 'Admin',
      info: 'Usuários registrados',
      active: true
    }, {
      name: 'Editor',
      info: 'Usuários registrados',
      active: true
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
        id: 11,
        provider: 'local',
        name: 'Registrado',
        email: 'resgitrado@a.a',
        password: 'asd',
        group: 'Registrado',
        permissions: [{
          context: 'page',
          items: [{
            id: 0,
            roles: {
              c: false
            }
          }]
        }, {
          context: 'event',
          items: [{
            id: 0,
            roles: {
              c: true,
              r: false,
              u: false,
              d: false,
              p: false
            }
          }]
        }]
      }, {
        id: 0,
        provider: 'local',
        role: 'admin',
        isAdmin: true,
        name: 'Admin',
        email: 'admin@a.a',
        password: 'asd',
        group: 'Admin'
      }, {
        id: 22,
        provider: 'local',
        name: 'Editor',
        email: 'editor@a.a',
        password: 'asd',
        moderators: [0, 33],
        group: 'Editor',
        permissions: [{
          context: 'page',
          items: [{
            id: 0,
            roles: {
              c: true
            }
          }, {
            id: 1,
            roles: {
              p: true
            }
          }]
        }, {
          context: 'event',
          items: [{
            id: 14,
            roles: {
              c: false,
              r: true,
              u: true,
              d: true,
            }
          }]
        }]
      }, {
        id: 33,
        provider: 'local',
        name: 'Moderador',
        email: 'moderador@a.a',
        password: 'asd',
        group: 'Autor',
        permissions: [{
          context: 'page',
          items: [{
            id: 0,
            roles: {
              c: false
            }
          }]
        }, {
          context: 'event',
          items: [{
            id: 0,
            roles: {
              // c: false,
              // r: true,
              // u: true,
              // d: true,
            }
          }]
        }]
      })
      .then(() => {
        console.log('finished populating users');
      });
  });
