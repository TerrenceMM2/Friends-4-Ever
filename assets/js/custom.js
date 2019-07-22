$(document).ready(function() {
  
    $("#submit").on("click", function(){
        event.preventDefault();

        var friendName = $("#name-input").val().trim();
        var friendPhoto = $("#photo-file").val();
        var response1 = $("#question1").val();
        var response2 = $("#question2").val();
        var response3 = $("#question3").val();

        var newFriend = {
            name: friendName,
            photo: friendPhoto,
            scores: [
                response1,
                response2,
                response3,
            ]
        };

        console.log(newFriend);

        $.post("/api/friends", newFriend, function() {
            $("#name-input").val("");
            $("#photo-file").val("");
            $("#question1").val(3);
            $("#question2").val(3);
            $("#question3").val(3);
        }).then(function(res) {
            console.log(res);
        });

    });

});