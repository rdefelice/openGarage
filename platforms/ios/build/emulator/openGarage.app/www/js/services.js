angular.module('opengarage.services', [])


.service('garageService', function ($http, $q){
    var webservice_url = "http://192.168.1.197:43111/";

    this.getStatus = function(){
	var status = {};
    	$http.get(webservice_url+"jc").then(function (result){
		return result.data;
	});
    };
});
