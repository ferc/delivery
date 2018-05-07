import Angular from 'angular';

let Module = Angular.module('ProductService', []);

Module.service('productService', function($http) {
  this.getByCategory = (categoryId) =>
    $http.get(`/mockups/products-by-categories/${categoryId}.json`)
      .then(response => response.data.results);
});

export default Module.name;
