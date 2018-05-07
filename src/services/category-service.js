import Angular from 'angular';

let Module = Angular.module('CategoryService', []);

Module.service('categoryService', function($http) {
  this.getAll = () =>
    $http.get('/mockups/categories.json')
      .then(response => response.data.results);
});

export default Module.name;
