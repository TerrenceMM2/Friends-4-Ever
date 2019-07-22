var friendsData = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

        var friendQuotient = 0;
        var friendMatch;

        for (var i = 0; i < friendsData.length; i++) {
            console.log(friendsData[i]);
            var sum = 0;
            var newFriendScores = req.body.scores;
            var currentFriendScores = friendsData[i].scores;
            for (var j = 0; j < currentFriendScores.length; j++) {
                sum += difference(parseInt(newFriendScores[j]), currentFriendScores[j]);
                console.log(sum);
            };

            if (sum > friendQuotient) {
                friendQuotient = sum;
                friendMatch = friendsData[i].name;
            }
        };

        function difference(a, b) {
            return Math.abs(a - b);
        }

        friendsData.push(req.body);

        res.send(friendMatch);

    });

};