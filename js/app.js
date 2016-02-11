var spatchApp = angular.module( 'spatchApp', ['ngRoute','timer','ngMap'] );

 
spatchApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
      }).
      when('/rsvp', {
        templateUrl: 'partials/rsvp.html',
        controller: 'rsvpCtrl'
      }).
      when('/weddingparty', {
        templateUrl: 'partials/weddingparty.html',
        controller: 'weddingPartyCtrl'
      }).
      when('/itinerary', {
        templateUrl: 'partials/itinerary.html',
        controller: 'itineraryCtrl'
      }).
      when('/location', {
        templateUrl: 'partials/location.html',
        controller: 'myCtrl'
      }).
      when('/giftlist', {
        templateUrl: 'partials/giftlist.html',
        controller: 'myCtrl'
      }).

      otherwise({
        redirectTo: '/home'
      });
  }]);
  

// set page to full screen
spatchApp.directive('resize', function ($window) {
    return function (scope, element) {

      scope.style = function () {
          return {
              'min-height': ($window.innerHeight-5) + 'px',

          };
      };

    
    }
});


// set rsvp popup to full screen
spatchApp.directive('rsvpsize', function ($window) {
    return function (scope, element) {

      scope.style = function () {
          return {
              'height': (Math.max(
                              document.body.scrollHeight,
                              document.documentElement.scrollHeight,
                              document.body.offsetHeight,
                              document.documentElement.offsetHeight,
                              document.body.clientHeight,
                              document.documentElement.clientHeight
                            )) + 'px',


          };
      };

    
    }
});


// import wedding party data
spatchApp.factory('weddingPartyData', function($http) {
  var factory = {};
  factory.getData = function() {
        return $http.get('json/weddingPartyData_JSON.php');
  };

  return factory;
  
});


// import itinerary data
spatchApp.factory('itineraryData', function($http) {
  var factory = {};
  factory.getData = function() {
        return $http.get('json/itineraryData_JSON.php');
  };

  return factory;
  
});

