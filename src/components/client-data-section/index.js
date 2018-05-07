import Angular from 'angular';
import AngularMaterial from 'angular-material';

import ClientData from '../client-data';
import ProductsList from '../products-list';

import './client-data-section.scss';

let Module = Angular.module('ClientDataSection', [
  AngularMaterial,
  ClientData,
  ProductsList
]);

Module.component('clientDataSection', {
  bindings: {
    order: '='
  },
  controller: function($mdDialog, $route) {
    this.$onInit = () => {
      this.id = $route.current.params.id;
    }

    this.areThereProducts = () => !!Object.keys(this.order.products).length;

    this.openModalData = () => {
      const products = Object.keys(this.order.products)
        .map(id => ({
          amount: this.order.products[id].amount,
          id
        }));

      const order = {
        client: this.order.client,
        deliveryId: this.order.deliveryId,
        products
      };

      $mdDialog.show({
        clickOutsideToClose: true,
        controller: function (order, $scope) { $scope.order = order; },
        locals: { order },
        template: '<pre>{{ order | json }}</pre>'
      });
    }

    this.isValidClient = () =>
      this.order.client.firstName &&
      this.order.client.lastName &&
      this.order.client.address &&
      this.order.client.phone &&
      this.order.client.email;
  },

  templateUrl: require('./client-data-section.html'),
});

export default Module.name;
