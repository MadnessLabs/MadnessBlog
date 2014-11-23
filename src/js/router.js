app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
        templateUrl: 'html/home.html',
        controller: 'homeCtrl'
    })
    .otherwise({
        redirectTo: '/home'
    });
}]);