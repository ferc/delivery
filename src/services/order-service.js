import Angular from 'angular';

let Module = Angular.module('orderService', []);

Module.service('orderService', function() {
  this.getDeliveries = () =>
    $http.get('/mockups/deliveries.json')
      .then(response => response.data.results);
});

export default Module.name;
