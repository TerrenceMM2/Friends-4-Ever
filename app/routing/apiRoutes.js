var friendsData = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

        // Sets max allowed difference based on a 1-5 scale and 10 questions.
        var friendQuotient = 40;
        var friendMatch;
        var newFriendScores = req.body.scores;

        // Converts stored array values from strings to numbers
        req.body.scores.forEach(function(part, index) {
            this[index] = parseInt(this[index]);
        }, req.body.scores);

        for (var i = 0; i < friendsData.length; i++) {
            var sum = 0;
            var currentFriendScores = friendsData[i].scores;
            // Loops through each value in the scores array and compares them against the user submitted entries and add to the sum for future comparison
            for (var j = 0; j < currentFriendScores.length; j++) {
                sum += difference(parseInt(newFriendScores[j]), currentFriendScores[j]);
            };

            // In the final sum is smaller than the friendQuotient number, the friendQuotient is set to the current sum.
            // The best match will have the smallest friendQuotient. In other words, the least amount of variation of the form response answers.
            if (sum < friendQuotient) {
                friendQuotient = sum;
                friendMatch = friendsData[i];
            };
        };

        // Returns the result of the difference between absolute value of each number
        // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
        function difference(a, b) {
            return Math.abs(a - b);
        };

        // Pushes newly submitted form data to Friends array.
        friendsData.push(req.body);
        
        // After all objects in the friendsArray have been compared, the final friend object is returned as the match.
        res.send(friendMatch);
    });
};