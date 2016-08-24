pongbot.controller('HomeController', function($scope, $http, $firebaseObject, $state, $interval, Time) {

    var MINUTE = 1000;

    var active, a, game;

    game = firebase.database().ref('/game');

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    function getGameState() {
        var gObj = $firebaseObject(game);

        gObj.$loaded()
        .then(function() {
            console.log('Checking gamestate');
            firebase.database().ref('/game').once('value').then(function(game) {
                var gs = $firebaseObject(game);

                console.log(gs);


                if (gs === true) {
                    $scope.active = true;
                } else {
                    $scope.active = false;
                }
            });
        });

        $scope.$apply();
    }


    $scope.startGame = function() {

        console.log('startGame()');

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
        console.log('endGame()');

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

    $interval(getGameState, MINUTE);
});
