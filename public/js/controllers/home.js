pongbot.controller('HomeController', function($scope, $http, $firebaseObject, $state) {

    var active, a;

    var active = firebase.database().ref('/active');

    firebase.database().ref('/active').on('value', function(activeSnapshot) {
        var val = activeSnapshot.val();

        console.log(val);

        if (val === true) {
            $scope.active = true;
        } else {
            $scope.active = false;
        }

        $scope.$apply();
    });

    $scope.startGame = function() {
        $http({
            method : 'POST',
            url    : '/active'
        });

        active.set(true);
    }

    $scope.endGame = function() {
        $http({
            method : 'POST',
            url    : '/inactive'
        });

        active.set(false);
    }
});
