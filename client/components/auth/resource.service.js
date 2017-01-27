'use strict';

export function Resource($http) {
  'ngInject';

  function get() {
    return $http.get('/api/resources');
  }

  return {
    get
  };
}
