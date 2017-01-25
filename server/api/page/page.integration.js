'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPage;

describe('Page API:', function() {
  describe('GET /api/pages', function() {
    var pages;

    beforeEach(function(done) {
      request(app)
        .get('/api/pages')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pages = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(pages).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/pages', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pages')
        .send({
          name: 'New Page',
          info: 'This is the brand new page!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPage = res.body;
          done();
        });
    });

    it('should respond with the newly created page', function() {
      expect(newPage.name).to.equal('New Page');
      expect(newPage.info).to.equal('This is the brand new page!!!');
    });
  });

  describe('GET /api/pages/:id', function() {
    var page;

    beforeEach(function(done) {
      request(app)
        .get(`/api/pages/${newPage._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          page = res.body;
          done();
        });
    });

    afterEach(function() {
      page = {};
    });

    it('should respond with the requested page', function() {
      expect(page.name).to.equal('New Page');
      expect(page.info).to.equal('This is the brand new page!!!');
    });
  });

  describe('PUT /api/pages/:id', function() {
    var updatedPage;

    beforeEach(function(done) {
      request(app)
        .put(`/api/pages/${newPage._id}`)
        .send({
          name: 'Updated Page',
          info: 'This is the updated page!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPage = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPage = {};
    });

    it('should respond with the updated page', function() {
      expect(updatedPage.name).to.equal('Updated Page');
      expect(updatedPage.info).to.equal('This is the updated page!!!');
    });

    it('should respond with the updated page on a subsequent GET', function(done) {
      request(app)
        .get(`/api/pages/${newPage._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let page = res.body;

          expect(page.name).to.equal('Updated Page');
          expect(page.info).to.equal('This is the updated page!!!');

          done();
        });
    });
  });

  describe('PATCH /api/pages/:id', function() {
    var patchedPage;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/pages/${newPage._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Page' },
          { op: 'replace', path: '/info', value: 'This is the patched page!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPage = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPage = {};
    });

    it('should respond with the patched page', function() {
      expect(patchedPage.name).to.equal('Patched Page');
      expect(patchedPage.info).to.equal('This is the patched page!!!');
    });
  });

  describe('DELETE /api/pages/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/pages/${newPage._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when page does not exist', function(done) {
      request(app)
        .delete(`/api/pages/${newPage._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
