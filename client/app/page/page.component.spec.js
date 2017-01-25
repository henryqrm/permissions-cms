'use strict';

describe('Component: PageComponent', function() {
  // load the controller's module
  beforeEach(module('tempApp.page'));

  var PageComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PageComponent = $componentController('page', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
