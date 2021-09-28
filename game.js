var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var level = 0,index = 0;

function checkAnswer(ind){
  if(gamePattern[ind] !== userClickedPattern[userClickedPattern.length-1]){
    level = 0;
    $("h1").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over");
    var goAudio = new Audio("sounds/wrong.mp3");
    goAudio.play();
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
  }
  else if(ind === gamePattern.length-1){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function (){
    $("#" + currentColour).removeClass("pressed");
  },100);

}
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function handler(id) {
  userClickedPattern.push(id);
  playSound(id);
}


function nextSequence(){
  index = 0;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = []
}


$(".btn").click(function (event){
  handler($(this).attr('id'));
  animatePress($(this).attr('id'));
  checkAnswer(index++);
})

$(document).keydown(function(){
  nextSequence();
})
