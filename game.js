var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click touchstart", function(event) {
    event.preventDefault(); // Prevent default touch behavior
    if (started) {
        var userChosenColour = event.currentTarget.id;
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass('pressed');
    setTimeout(function() {
        $("#" + currentColour).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key or Tap to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
            startOver();
        }, 200);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    enableRestart();
}

function enableRestart() {
    $(document).on("keypress touchstart", function(event) {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
            $(document).off("keypress touchstart");
        }
    });
}

$(document).on("touchstart", function(event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(document).off("keypress touchstart");
        $(document).off("touchstart");
    }
});
