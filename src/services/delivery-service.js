import Angular from 'angular';

let Module = Angular.module('DeliveryService', []);

Module.service('deliveryService', function($http) {
  this.get = (id) =>
    $http.get(`/mockups/deliveries/${id}.json`)
      .then(response => response.data);

  this.getAll = () =>
    $http.get('/mockups/deliveries.json')
      .then(response => response.data.results);
});

export default Module.name;
