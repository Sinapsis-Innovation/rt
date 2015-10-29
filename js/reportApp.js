'use strict';

/**
 * @ngdoc overview
 * @name reportesApp
 * @description
 * # reportesApp
 *
 * Main module of the application.
 */
 var angularRoutingApp = angular.module('ProjectsApp', ['kendo.directives','ngRoute']);
// angular
//   .module('ProjectsApp', ['kendo.directives','ngRoute'])
  angularRoutingApp.config(function ($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
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
