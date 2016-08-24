pongbot.controller('HomeController', function($scope, $http, $firebaseObject, $state, $interval, Time) {
    'use strict';

    var game, gObj;

    game = firebase.database().ref('/game');
    gObj = $firebaseObject(game);

    gObj.$loaded()
    .then(function() {
        var gs = gObj;

        if (gs.active === true) {
            $scope.active = true;
        } else {
            $scope.active = false;
        }
    });

    $scope.startGame = function() {

        $http({
            method : 'POST',
            url    : '/active'
        });

        game.set({
            active : true,
            time   : Time.currentTime()
        });

        $scope.active = true;
    }

    $scope.endGame = function() {

        $http({
            method : 'POST',
            url    : '/ended'
        });

        game.set({
            active : false,
            time   : Time.currentTime()
        });

        $scope.active = false;
    }
});
