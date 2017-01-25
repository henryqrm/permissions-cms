'use strict';

describe('Component: ResourceComponent', function() {
  // load the controller's module
  beforeEach(module('tempApp.resource'));

  var ResourceComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ResourceComponent = $componentController('resource', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
