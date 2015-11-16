Parse.initialize("FTmwn1vs8X04cMm28yqjEsW2cIL3KFjO8ABq8ynS", "eflptiA0tXO9Sox7kmvfuDM6YgvpiMqlfVeDpjk9");

var Name = Parse.Object.extend('Name');
var myApp = angular.module('myApp', []);

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
	$scope.getNames = function() {
		var query = new Parse.Query(Name);
		$('#winner').empty();
		query.find({
			success:function(results) {
				$scope.random(results);
			}
		});
	}

	$scope.random = function(data) {
		var random = Math.floor(Math.random() * data.length);
		$('#winner').append("<p class='winner'>" + data[random].get('name') + "</p>" +
			'<img src="http://i.imgur.com/m0sishw.gif">' + 
			'<img src="http://boards.3edgy6u.com/tj/src/1399747496000.gif">' + 
			'<img src="http://media.giphy.com/media/SX3Z7NMCsAu4M/giphy.gif">');
	}
});

