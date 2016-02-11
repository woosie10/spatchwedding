
spatchApp.controller('NavCtrl', function($scope, $location) {
  $scope.isActive = function(route) {
    $scope.path = $location.path();
    return $location.path() === route;
  };
});


spatchApp.controller('myCtrl', ['$scope', '$route', '$http', '$location',
  function ($scope, $route, $http, $location) {

  //page router
  $scope.$route = $route;

}]);


// home page controller
spatchApp.controller('homeCtrl', ['$scope', '$route', '$http', '$location',
  function ($scope, $route, $http, $location) {

  //page router
  $scope.$route = $route;

  // create countdown to 30th April 2016 
  var date2 = new Date(1462017600000);
  var date1 = new Date();
  var timeDiff = Math.abs((date1.getTime() - date2.getTime())/1000);
  $scope.dateDifference = timeDiff;

}]);


// wedding party page controller
spatchApp.controller('weddingPartyCtrl', ['$scope', '$route', '$http', '$location', '$routeParams', 'weddingPartyData',
  function ($scope, $route, $http, $location, $routeParams, weddingPartyData) {

  //page router
  $scope.$route = $route;
  
  //weddingPartyData
  $scope.weddingParty = [];
 
  weddingPartyData.getData().then(function(data){
      $scope.weddingParty = data.data;
  });

}]);


// itinerary page controller
spatchApp.controller('itineraryCtrl', ['$scope', '$route', '$http', '$location', '$routeParams', 'itineraryData',
  function ($scope, $route, $http, $location, $routeParams, itineraryData) {

  //page router
  $scope.$route = $route;
  
  //itineraryData
  $scope.itinerary = [];
 
  itineraryData.getData().then(function(data){
      $scope.itinerary = data.data;
  });

}]);


// rsvp page controller
spatchApp.controller('rsvpCtrl', ['$scope', '$route', '$http', '$location',
  function ($scope, $route, $http, $location) {

  //page router
  $scope.$route = $route;
  
  $scope.composeEmail = [];
  
  $scope.composeEmail.date = new Date();
  
  $scope.submission = false;
  $scope.submissionSuccess = false;

  var param = function(data) {
        var returnString = '';
        for (d in data){
            if (data.hasOwnProperty(d))
               returnString += d + '=' + data[d] + '&';
        }
        // Remove last ampersand and return
        return returnString.slice( 0, returnString.length - 1 );
  };
  
  $scope.submitForm = function() {
    
    /*alert($scope.composeEmail.attending
        + " " + $scope.composeEmail.name
        + " " + $scope.composeEmail.email
        + " " + $scope.composeEmail.size
        + " " + $scope.composeEmail.song1
        + " " + $scope.composeEmail.song2
        + " " + $scope.composeEmail.song3
        + " " + $scope.composeEmail.date);*/
    
      $http({
      method : 'POST',
      url : 'php/process.php',
      data : param($scope.composeEmail), // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
      })
      .success(function(data) {
        if (!data.success) {
         // if not successful, bind errors to error variables
         $scope.errorAttending = data.errors.attending;
         $scope.errorName = data.errors.name;
         $scope.errorEmail = data.errors.email;
         $scope.errorSize = data.errors.size;
         $scope.submissionMessage = data.messageError;
         $scope.submission = true; //shows the error message
         $scope.submissionSuccess = data.success;
        } else {
          // if successful, bind success message to message
           $scope.submissionMessage = data.messageSuccess;
           $scope.submissionSuccess = data.success;
           $scope.errorAttending = '';
           $scope.errorName = '';
           $scope.errorEmail = '';
           $scope.errorSize = '';
           $scope.composeEmail = {}; // form fields are emptied with this line
           $scope.submission = true; //shows the success message
        }
       });
     
    };
   
    $scope.submissionClose = function() {
      
      $scope.submissionSuccess = false;
      
    };
    

}]);