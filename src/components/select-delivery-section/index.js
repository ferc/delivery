import Angular from 'angular';
import AngularMaterial from 'angular-material';

import CategoryService from '../../services/category-service';
import DeliveryService from '../../services/delivery-service';

import './select-delivery-section.scss';

let Module = Angular.module('SelectDeliverySection', [
  AngularMaterial,
  CategoryService,
  DeliveryService
]);

Module.component('selectDeliverySection', {
  controller: function(categoryService, deliveryService, $q, $scope) {
    this.$onInit = () => {
      $q.all([
        categoryService.getAll(),
        deliveryService.getAll()
      ])
      .then(([categories, deliveries]) => {
        this.deliveries = deliveries.map(delivery => {
          const categoriesName = delivery.categories.map(category =>
            categories.find(c => c.id === category.id).name
          );

          return {
            id: delivery.id,
            description: categoriesName.join(', '),
            name: delivery.name
          };
        });
      });
    }
  },

  templateUrl: require('./select-delivery-section.html'),
});

export default Module.name;
