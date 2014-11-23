var app   = angular.module("app",["ngRoute","ui.bootstrap","ngAnimate"])
.config(['$httpProvider', function($httpProvider) {
        // ENABLE CORS
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
      // ENABLE CACHING
      //$httpProvider.defaults.cache = true;

      // SET POST HEADERS
      $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    }
]);

// GLOBAL APPLICATION CONTROLLER
app.controller('appCtrl', function($scope, $location) {
	
	// FUNCTIONS
	$scope.getHash = function(){
		$scope.hash = location.hash.split('/')[1];
	};

	$scope.changePage = function(){
		$scope.getHash();

		if($("#bs-example-navbar-collapse-1").hasClass("in")){
			$("#bs-example-navbar-collapse-1").collapse('hide');
		}
		
		$scope.hideLoader();	
	};

	$scope.isActive = function(route) {
        return route === $location.path();
    };

    $scope.showLoader = function(){
    	$("body").append('<div class="loader show"><i class="fa fa-circle-o-notch fa-fw fa-spin"></i></div>');
    };

    $scope.hideLoader = function(){
    	$(".loader").remove();
    };

	// EVENTS
	$scope.$on('$locationChangeSuccess', $scope.changePage);
	$scope.$on('$locationChangeStart', $scope.showLoader);

	// START
	$scope.getHash();
});