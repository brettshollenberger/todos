angular
  .module('app')
  .controller('MainCtrl', ['Todo', '$scope', '$routeParams',
    function(Todo, $scope, $routeParams) {

    $scope.$on('$routeChangeSuccess', function () {
      var status = $scope.status = $routeParams.status || '';

      $scope.statusFilter = (status === 'active') ?
      { completed: false } : (status === 'completed') ?
      { completed: true } : null;
    });

    var uncompletedTodos;

    $scope.activeTodo = Todo.new();

    $scope.checked = false;

    $scope.edit = function(todo) {
      $scope.activeTodo = todo;
    };

    $scope.checkAll = function(checked) {
      _.each($scope.todos, function(todo) { $scope.checkAndSave(todo, checked); });
    };

    $scope.checkAndSave = function(todo, checked) {
      todo.completed = checked || !!(!todo.completed);
      todo.$save();
    };

    Todo.all().then(function(response) {
      $scope.todos = response;
      updateRemainingTodoCount();
    });

    Todo.after('$save', function(data) {
      $scope.todos.nodupush(data);
      $scope.todos = _.sortBy($scope.todos, function(todo) { return todo.completed; });
      updateRemainingTodoCount();
      $scope.activeTodo = Todo.new();
    });

    Todo.before('$delete', function(data) {
      _.remove($scope.todos, data);
      updateRemainingTodoCount();
    });

    function updateRemainingTodoCount() {
      uncompletedTodos = _.chain($scope.todos)
                          .map(function(todo) { return !todo.completed })
                          .compact()
                          .value();
      $scope.remainingCount = uncompletedTodos.length;
    };
  }]);
