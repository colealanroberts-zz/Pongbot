pongbot.controller('HomeController', function($scope, $http, $firebaseObject, $state, $interval, Time) {
    'use strict';

    var v = 'version 0.0.1 - Built by Cole Roberts';

    console.log(v);

    var game, gObj;

    game = firebase.database().ref('/game');
    gObj = $firebaseObject(game);

    function getGameState() {
        gObj.$loaded()
        .then(function() {
            var gs = gObj;

            if (gs.active === true) {
                $scope.active = true;
            } else {
                $scope.active = false;
            }
        });
    }

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

    getGameState();
    $interval(getGameState, 1000);
});
