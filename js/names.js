Parse.initialize("FTmwn1vs8X04cMm28yqjEsW2cIL3KFjO8ABq8ynS", "eflptiA0tXO9Sox7kmvfuDM6YgvpiMqlfVeDpjk9");

var Name = Parse.Object.extend('Name');
var myApp = angular.module('myApp', []);

var myCtrl = myApp.controller('myCtrl', function($scope) {
	$scope.addNameCheck = false;

	$scope.addName = function() {
		var newName = new Name();
		newName.set('name', $scope.memberName)
		newName.save();
		console.log($scope.memberName);
	}
});

