import Angular from 'angular';
import AngularMaterial from 'angular-material';

import './client-data.scss';

let Module = Angular.module('ClientData', [
  AngularMaterial
]);

Module.component('clientData', {
  bindings: {
    client: '='
  },
  controller: function() {
  },

  templateUrl: require('./client-data.html'),
});

export default Module.name;
