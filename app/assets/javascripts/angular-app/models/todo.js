angular
  .module('app')
  .factory('Todo', ['ActiveResource', function(ActiveResource) {

    function Todo(attributes) {
      this.string('title');
      this.boolean('completed');
    };

    Todo.inherits(ActiveResource.Base);
    Todo.api.set('http://localhost:3000/api/v1').format('json');
    return Todo;
  }]);
