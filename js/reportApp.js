'use strict';

/**
 * @ngdoc overview
 * @name reportesApp
 * @description
 * # reportesApp
 *
 * Main module of the application.
 */
 var angularRoutingApp = angular.module('ProjectsApp', ['kendo.directives','angular-loading-bar','ngRoute']);
// angular
//   .module('ProjectsApp', ['kendo.directives','ngRoute'])
  angularRoutingApp.config(function ($routeProvider, $locationProvider, cfpLoadingBarProvider) {
    // $locationProvider.html5Mode(true);
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner"><div class="modal-backdrop"></div><img class="fa-spinner-loading" src="images/loading-ng.gif"/></div>';

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/:project', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      /*.when('/:project', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'projects'
      })*/
      .otherwise({
        redirectTo: '/'
      });
  });
