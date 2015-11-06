'use strict';

/**
 * @ngdoc service
 * @name reportesApp.myService
 * @description
 * # myService
 * Service in the reportesApp.
 */
angularRoutingApp.service('menuService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    /*projects, pipeline, inventory, donors*/
    var menu={};
    menu.path = 'projects';
    return menu;
  });
