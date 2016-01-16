var myApp = angular.module('myApp', ['firebase']);

var myCtrl = myApp.controller('myCtrl', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject) {
	var ref = new Firebase('https://adp-raffle-button.firebaseio.com/');	
	var membersRef = ref.child("members");
	$scope.members = $firebaseArray(membersRef);
	$scope.authObj = $firebaseAuth(ref);

	$scope.loggedIn = false;
	$scope.winnerClick = false;

	$scope.membersArray = [];

	var authData = $scope.authObj.$getAuth();

	$scope.signUp = function() {
		$scope.authObj.$createUser({
			email: $scope.email,
			password: $scope.password
		})
		.then(function(){
			$scope.email = "";
			$scope.password = "";
		});
	}

	$scope.logIn = function() {
		return $scope.authObj.$authWithPassword({
			email: $scope.email,
			password: $scope.password
		});
	}

	$scope.signIn = function() {
		$scope.logIn().then(function(){
			$scope.loggedIn = true;
			$scope.email = "";
			$scope.password = "";
		});
	}

	$scope.addName = function() {
		$scope.members.$add({
			name: $scope.name,
			quarter: $scope.quarter,
			gif1: $scope.gif1,
			gif2: $scope.gif2
		})
		.then(function(){
			$scope.name = "";
			$scope.quarter = "";
		});
	}

	$scope.addToArray = function() {
		$scope.members.$loaded().then(function(members){
			members.forEach(function(data){
				$scope.membersArray.push(data);
			});
		})
	}

	$scope.addToArray();
	console.log($scope.membersArray)


	$scope.getNames = function() {
		if ($scope.membersArray.length != 0) {
			$scope.random = Math.floor(Math.random() * $scope.membersArray.length);
			$scope.winner = $scope.membersArray[$scope.random].name;
			$scope.gif1 = $scope.membersArray[$scope.random].gif1;
			$scope.gif2 = $scope.membersArray[$scope.random].gif2;
			var index = $scope.membersArray.indexOf($scope.membersArray[$scope.random]);
			if (index > -1) {
				$scope.membersArray.splice(index, 1);
			}
			console.log($scope.membersArray)
		} else {
			$scope.winner = "No more members"
		}
		$scope.winnerClick = true;
		
	}

	$scope.removeMember = function(member) {
		$scope.members.$remove(member);
		var index = $scope.membersArray.indexOf(member);
		$scope.membersArray.splice(index, 1)
	}
});