pongbot.controller('HomeController', function($scope, $http, $firebaseObject, $state) {

    var active, a;

    var active = firebase.database().ref('/active');

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

    var d = new Date();
    var time = formatAMPM(d);

    console.log(time);


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
