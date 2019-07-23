var friendsData = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

        var friendQuotient = 40;
        var friendMatch;
        var newFriendScores = req.body.scores;

        req.body.scores.forEach(function(part, index) {
            this[index] = parseInt(this[index]);
        }, req.body.scores);

        for (var i = 0; i < friendsData.length; i++) {
            var sum = 0;
            // var newFriendScores = req.body.scores;
            var currentFriendScores = friendsData[i].scores;
            for (var j = 0; j < currentFriendScores.length; j++) {
                sum += difference(parseInt(newFriendScores[j]), currentFriendScores[j]);
            };

            console.log("sum ", sum)

            if (sum < friendQuotient) {
                friendQuotient = sum;
                console.log("friendQuotient ", friendQuotient);
                friendMatch = friendsData[i].name;
                console.log("friendMatch ", friendMatch);
            }
        };

        function difference(a, b) {
            return Math.abs(a - b);
        }

        friendsData.push(req.body);

        res.send(friendMatch);

    });

};