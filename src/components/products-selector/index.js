import Angular from 'angular';
import AngularMaterial from 'angular-material';
import AngularMaterialDataTable from 'angular-material-data-table';

import CategoryService from '../../services/category-service';
import ProductService from '../../services/product-service';

import './products-selector.scss';

let Module = Angular.module('ProductsSelector', [
  AngularMaterial,
  AngularMaterialDataTable,
  CategoryService,
  ProductService
]);

Module.component('productsSelector', {
  bindings: {
    onAddProduct: '&',
    deliveryCategories: '<',
    orderProducts: '='
  },
  controller: function(categoryService, productService, $scope) {
    this.$onInit = () => {
      this.categories = [];
      this.products = [];

      categoryService.getAll()
        .then(categories => this.categories = categories);

      $scope.$watch('$ctrl.currentCategoryId', this.onChangeCategory);
    };

    this.$onChanges = changes => {
      if (changes.deliveryCategories && !changes.deliveryCategories.previousValue) {
        this.currentCategoryId = changes.deliveryCategories.currentValue[0].id;
      }
    };

    this.addProduct = product => this.onAddProduct({ product });

    this.getCurrentProducts = () => {
      const category = this.categories.find(category => category.id === this.currentCategoryId);

      return category ? category.products : [];
    };

    this.isAlreadyInOrder = product =>
      Object.keys(this.orderProducts)
        .map(id => parseInt(id))
        .includes(product.id);

    this.onChangeCategory = categoryId => {
      if (categoryId) {
        this.products = [];

        productService.getByCategory(categoryId)
          .then(products => this.products = products);
      }
    };
  },

  templateUrl: require('./products-selector.html'),
});

Module.filter('exists', () => (source = [], arrayFilter = [], attributeSource, attributeFilter) => {
  const mapValue = attribute => value => (attribute ? value[attribute] : value);

  arrayFilter = arrayFilter.map(mapValue(attributeFilter));

  return source.filter(value => {
    value = mapValue(attributeSource)(value);

    return arrayFilter.includes(value);
  });
});

export default Module.name;
