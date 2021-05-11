'use strict mode'
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#title').text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

}

function playSound(color) {
  let audio = new Audio(`sounds/${color}.mp3`)
  audio.play();
}

$('.box').click(function () {
  let userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatepress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1)
})

function animatepress(currentColor) {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
}

$(document).keydown(function () {
  if (started === false) {
    $('#title').text(`Level ${level}`);
    nextSequence();
    started = true;
  }
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    $('#title').text(`Game Over, Press Any Key To Restart`);
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

