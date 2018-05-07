import Angular from 'angular';
import AngularMaterial from 'angular-material';
import AngularRoute from 'angular-route';

import ClientDataSection from './components/client-data-section';
import MakeOrderSection from './components/make-order-section';
import SelectDeliverySection from './components/select-delivery-section';

import './styles.scss';

Angular.module('DespegarApp', [
  AngularMaterial,
  AngularRoute,
  ClientDataSection,
  MakeOrderSection,
  SelectDeliverySection
])

.config(function($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('indigo')
    .accentPalette('light-blue');
})

.config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode({
    enabled: true
  });

  $routeProvider.when('/', {
    template: '<select-delivery-section></select-delivery-section>',
    section: 'select-delivery'
  });

  $routeProvider.when('/delivery/:id/realizar-pedido', {
    template: '<make-order-section order="order"></make-order-section>',
    section: 'make-order'
  });

  $routeProvider.when('/delivery/:id/completar-datos', {
    template: '<client-data-section order="order"></client-data-section>',
    section: 'client-data'
  });

  $routeProvider.otherwise('/');
})

.controller('AppController', function($rootScope, $scope, $timeout) {
  $rootScope.order = {
    client: {},
    products: {}
  };

  // Custom fix for a md-nav-item disable attribute bug
  // https://github.com/angular/material/pull/10992#issuecomment-373947569
  $scope.fixFlagNavigation = false;
  $scope.shouldDisableNavigation = (disable) => $scope.fixFlagNavigation && disable;
  $timeout(() => $scope.fixFlagNavigation = true);

  $scope.$on('$routeChangeStart', ($event, next, current) => {
    $scope.section = next.$$route.section;

    if ($scope.section === 'select-delivery') {
      // Keep the client data
      $rootScope.order.deliveryId = null;
      $rootScope.order.products = {};
    }
  });
});
