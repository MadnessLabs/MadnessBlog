app.factory('db', function($http, $q){
	var db = {};

	db.get = function(rUrl, rParams){
		if(!rParams){
			rParams = false
		}
		var deferred = $q.defer();
		$http.get(rUrl,{params: rParams},{
			headers: {
			    'Content-type': 'application/json'
			}
		})
		.success(function(data, status, headers, config) {
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config) {
			console.log("Failed to Get Data!");
		});
		return deferred.promise;
	};

	db.post = function(rUrl, rParams){
		if(!rParams){
			rParams = false
		}
		var deferred = $q.defer();
		$http.post(rUrl, {params: rParams},{
			headers: {
			    'Content-type': 'application/json'
			}
		})
		.success(function(data, status, headers, config) {
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config) {
			console.log("Failed to Get Data!");
		});
		return deferred.promise;
	};
	
	return db;
});		