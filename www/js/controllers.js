angular.module('opengarage.controllers', [])
.controller('MainCtrl', function($scope, $rootScope, $stateParams, garageService, $http, SecureLocalStorage) {

    $rootScope.settings = {pass: "", ip: ""};
    $scope.updateStatus = function () {
    	var webservice_url = "http://192.168.1.197:43111/";
        var status = {};
        $http.get(webservice_url+"jc").then(function (result){
                $scope.garageStatus = result.data;
		if(result.data.dist > 200){
			$scope.garageStatus.verbose_status = "Garage Empty, Door Closed";
		} else if (result.data.dist > 30){
			$scope.garageStatus.verbose_status = "Garage Occupied, Door Closed";
		} else {
			$scope.garageStatus.verbose_status = "Garage Door Open";
		}
        });
    };

    $scope.loadSettings = function() {
      SecureLocalStorage.getItem("ip").then(function (ip){
	  $rootScope.settings.ip = ip;
      })
      SecureLocalStorage.getItem("pass").then(function (pass){
	  $rootScope.settings.pass = pass;
      })
    };

    $scope.openClose = function () {
        var webservice_url = "http://" + $rootScope.settings.ip + "/";
	var p = $rootScope.settings.pass;
	var req = webservice_url+"cc?click=1&dkey="+p;
	//console.log(req);
	//alert(req);
        $http.get(req).then(function (result){
		console.log(result.data);
        });	
    };

    $scope.updateStatus();
})

.controller('settingsCtrl', function($scope, $rootScope, $stateParams, garageService, $http, SecureLocalStorage) {

    $rootScope.settings = {pass: "", ip: ""};

    $scope.saveSettings = function () {
	  $rootScope.settings.ip = $scope.settings.ip;
	  $rootScope.settings.pass = $scope.settings.pass;
	  SecureLocalStorage.setItem("ip" , $scope.settings.ip);
	  SecureLocalStorage.setItem("pass" , $scope.settings.pass);
    };

    $scope.clearSettings = function () {
	$rootScope.settings.ip = "";
	$rootScope.settings.pass = "";
	SecureLocalStorage.removeItem("ip");
	SecureLocalStorage.removeItem("pass");
    };


    $scope.loadSettings = function() {
      SecureLocalStorage.getItem("ip").then(function (ip){
	  $rootScope.settings.ip = ip;
      })
      SecureLocalStorage.getItem("pass").then(function (pass){
	  $rootScope.settings.pass = pass;
      })
    };

});

