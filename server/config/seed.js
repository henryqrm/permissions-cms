/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Group from '../api/group/group.model';
import Resource from '../api/resource/resource.model';
import Page from '../api/page/page.model';
import Evento from '../api/event/event.model';

Evento.find({}).remove()
  .then(() => {
    Evento.create({
      id: 0,
      title: 'evento Um',
      text: 'Está é a evento 1',
      context: 'page',
      status: 'moderator',
      moderators: [],
      active: true
    }, {
      id: 1,
      title: 'evento Dois',
      text: 'Isso é a evento dois',
      context: 'page',
      status: 'published',
      moderators: [],
      active: true
    });
  });

Page.find({}).remove()
  .then(() => {
    Page.create({
      id: 0,
      title: 'Página Um',
      text: 'Está é a página 1',
      context: 'page',
      status: 'moderator',
      moderators: [],
      active: true
    }, {
      id: 1,
      title: 'Página Dois',
      text: 'Isso é a página dois',
      context: 'page',
      status: 'published',
      moderators: [],
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
          c: false,
          r: true,
          u: false,
          d: false,
          p: false
        }
      }]
    }, {
      group: 'Moderador',
      contexts: [{
        name: 'page',
        roles: {
          c: false,
          r: true,
          u: true,
          d: false,
          p: true
        }
      }, {
        name: 'event',
        roles: {
          c: false,
          r: true,
          u: true,
          d: false,
          p: true
        }
      }]
    }, {
      group: 'Autor',
      contexts: [{
        name: 'event',
        roles: {
          c: true,
          r: true,
          u: true,
          d: false,
          p: false
        }
      }, {
        name: 'page',
        roles: {
          c: true,
          r: true,
          u: true,
          d: false,
          p: false
        }
      }]
    }, {
      group: 'Editor',
      contexts: [{
        name: 'page',
        roles: {
          c: false,
          r: true,
          u: true,
          d: true,
          p: false
        }
      }, {
        name: 'event',
        roles: {
          c: false,
          r: true,
          u: true,
          d: true,
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
      name: 'Editor',
      info: 'Usuários registrados',
      active: true
    }, {
      name: 'Moderador',
      info: 'Usuários registrados',
      active: true
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
        id: 11,
        provider: 'local',
        name: 'uRegistrado',
        email: 'registrado@asd',
        password: 'asd',
        group: 'Registrado',
        permissions: []
      }, {
        id: 12,
        provider: 'local',
        name: 'uModerador',
        email: 'moderador@asd',
        password: 'asd',
        group: 'Moderador',
        permissions: []
      }, {
        id: 13,
        provider: 'local',
        name: 'uAutor',
        email: 'autor@asd',
        password: 'asd',
        group: 'Autor',
        permissions: []
      }, {
        id: 14,
        provider: 'local',
        name: 'uEditor',
        email: 'editor@asd',
        password: 'asd',
        group: 'Editor',
        permissions: []
      }, {
        id: 0,
        provider: 'local',
        role: 'admin',
        isAdmin: true,
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin',
        group: 'Admin'
      })
      .then(() => {
        console.log('finished populating users');
      });
  });
