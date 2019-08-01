$(document).ready(function() {
  
    $("#submit").on("click", function(){
        event.preventDefault();

        var friendName = $("#name-input").val().trim();
        var friendPhoto = $("#photo-input").val();
        var response1 = $("#question1").val();
        var response2 = $("#question2").val();
        var response3 = $("#question3").val();
        var response4 = $("#question4").val();
        var response5 = $("#question5").val();
        var response6 = $("#question6").val();
        var response7 = $("#question7").val();
        var response8 = $("#question8").val();
        var response9 = $("#question9").val();
        var response10 = $("#question10").val();

        var newFriend = {
            name: friendName,
            photo: friendPhoto,
            scores: [
                response1,
                response2,
                response3,
                response4,
                response5,
                response6,
                response7,
                response8,
                response9,
                response10,
            ]
        };

        $.post("/api/friends", newFriend, function() {
            $("#name-input").val("");
            $("#photo-input").val("");
            $(".slider").val(3);
        }).then(function(res) {
            $("#friend-modal-name").text(res.name);
            $("#friend-modal-photo").attr("src", res.photo);
            $("#friend-result").modal("show");
        });

    });

});