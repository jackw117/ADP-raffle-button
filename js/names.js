var myApp = angular.module('myApp', ['firebase']);

var myCtrl = myApp.controller('myCtrl', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject) {
	var ref = new Firebase('https://adp-raffle-button.firebaseio.com/');	
	var membersRef = ref.child("members");
	$scope.members = $firebaseArray(membersRef);
	$scope.authObj = $firebaseAuth(ref);

	$scope.loggedIn = false;

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
			quarter: $scope.quarter
		})
		.then(function(){
			$scope.name = "";
			$scope.quarter = "";
		});
	}

	$scope.addToArray = function() {
		$scope.members.$loaded().then(function(members){
			members.forEach(function(data){
				$scope.membersArray.push(data.name);
			});
		})
	}

	$scope.addToArray();
	console.log($scope.membersArray)


	$scope.getNames = function() {
		if ($scope.membersArray.length != 0) {
			var random = Math.floor(Math.random() * $scope.membersArray.length);
			console.log(random)
			$scope.winner = $scope.membersArray[random];
			var index = $scope.membersArray.indexOf($scope.winner);
			if (index > -1) {
				$scope.membersArray.splice(index, 1);
			}
			console.log($scope.membersArray)
		} else {
			$scope.winner = "No more members"
		}
		
	}

	$scope.removeMember = function(member) {
		$scope.members.$remove(member);
		var index = $scope.membersArray.indexOf(member);
		$scope.membersArray.splice(index, 1)
	}
});