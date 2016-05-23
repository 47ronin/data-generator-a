'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('dataGenApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should exist', function () {
    expect(MainCtrl);
  });
});
describe('Controller: StockCtrl', function () {

  // load the controller's module
  beforeEach(module('dataGenApp'));

  var StockCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StockCtrl = $controller('StockCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should exist', function () {
    expect(StockCtrl);
  });
});
