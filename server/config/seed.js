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
      active: true
    }, {
      id: 1,
      title: 'Página Dois',
      text: 'Isso é a página dois',
      context: 'page',
      status: 'published',
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

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, ' +
        'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, ' +
        'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
        'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
        'tests alongside code. Automatic injection of scripts and ' +
        'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
        'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
        'payload, minifies your scripts/css/images, and rewrites asset ' +
        'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
        'and openshift subgenerators'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
        id: 11,
        provider: 'local',
        name: 'Registrado',
        email: 'resgitrado@a.a',
        password: 'asd'
      }, {
        id: 0,
        provider: 'local',
        role: 'admin',
        isAdmin: true,
        name: 'Admin',
        email: 'admin@a.a',
        password: 'asd'
      }, {
        id: 22,
        provider: 'local',
        name: 'Editor',
        email: 'editor@a.a',
        password: 'asd',
        moderators: [0, 33]
      }, {
        id: 33,
        provider: 'local',
        name: 'Moderador',
        email: 'moderador@a.a',
        password: 'asd'
      })
      .then(() => {
        console.log('finished populating users');
      });
  });
