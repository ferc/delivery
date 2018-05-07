import Angular from 'angular';
import AngularMaterial from 'angular-material';

import ProductsList from '../products-list';
import ProductsSelector from '../products-selector';

import CategoryService from '../../services/category-service';
import DeliveryService from '../../services/delivery-service';

import './make-order-section.scss';

let Module = Angular.module('MakeOrderSection', [
  AngularMaterial,
  CategoryService,
  DeliveryService,
  ProductsList,
  ProductsSelector
]);

Module.component('makeOrderSection', {
  bindings: {
    order: '='
  },
  controller: function(categoryService, deliveryService, $route, $scope) {
    this.$onInit = () => {
      this.id = $route.current.params.id;

      this.order.deliveryId = this.id;

      deliveryService.get(this.id)
        .then(delivery => this.delivery = delivery);
    }

    this.addProduct = (product) => {
      if (!this.order.products[product.id]) {
        this.order.products[product.id] = {
          amount: 1,
          id: product.id,
          name: product.name,
          price: product.price
        };
      }
    };

    this.areThereProducts = () => !!Object.keys(this.order.products).length;
  },

  templateUrl: require('./make-order-section.html'),
});

export default Module.name;
