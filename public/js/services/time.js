pongbot.service('Time', function() {
    return {
        currentTime: function() {
            var date, now;

            date = new Date();
            now  = date.getTime();

            return now;
        }
    };
});
