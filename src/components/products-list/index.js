import Angular from 'angular';
import AngularMaterial from 'angular-material';
import AngularMaterialDataTable from 'angular-material-data-table';

import './products-list.scss';

let Module = Angular.module('ProductsList', [
  AngularMaterial,
  AngularMaterialDataTable
]);

Module.component('productsList', {
  bindings: {
    order: '='
  },
  controller: function($scope) {
    this.areThereProducts = () => !!Object.keys(this.order.products).length;

    this.removeProduct = product => {
      delete this.order.products[product.id];
    };

    this.validateAmount = product => {
      if (!product.amount) {
        product.amount = 1;
      }
    };
  },

  templateUrl: require('./products-list.html'),
});

export default Module.name;
