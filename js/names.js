var myApp = angular.module('myApp', []);

var myCtrl = myApp.controller('myCtrl', function($scope) {

	$scope.membersArray = ["Andrew Kong", "Dylan Hardy", "Joseph Mohammed", "Ian Houghton",
							"An Sung", "Cameron Pinkham", "Keiva Augilera-Montea", 
							"Kathy Chiu", "Kevin Anderson", "Michael Bui", "Danny Sotelo",
							"Cai Biesinger", "Zoe Solvay"];

	$scope.getNames = function() {
		if ($scope.membersArray.length != 0) {
			$scope.random = Math.floor(Math.random() * $scope.membersArray.length);
			$scope.winner = $scope.membersArray[$scope.random];
			var index = $scope.membersArray.indexOf($scope.membersArray[$scope.random]);
			if (index > -1) {
				$scope.membersArray.splice(index, 1);
			}
			console.log($scope.random);
			console.log($scope.membersArray);
		} else {
			$scope.winner = "No more members"
		}
		$scope.winnerClick = true;
	}
});