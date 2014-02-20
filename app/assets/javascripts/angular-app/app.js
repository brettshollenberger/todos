angular
  .module('app', ['ngRoute', 'ActiveResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      controller: 'HomeCtrl'
    }).when('/:status', {
      controller: 'HomeCtrl',
    }).otherwise({
      redirectTo: '/'
    });
  }]);
