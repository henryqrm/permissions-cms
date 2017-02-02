export class UserFormUpdateComponent {
  $http;
  socket;
  users = [];
  newresource = {};

  /*@ngInject*/
  constructor($http, $scope, socket, $q) {
    this.$q = $q;
    this.$http = $http;
    this.socket = socket;
    this.contexts = [];

  }

  $onInit() {}
}