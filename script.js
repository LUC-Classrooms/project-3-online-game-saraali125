/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name:
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

let gameState = "splash";

function setup() {

  createCanvas(600, 400);

}

function draw() {
  background(200);
  switch (gameState) {
    case "splash":
      splash();
      break;
    case "play":
      play();
      break;
    case "gameOver":
      gameOver();
      break;
    default:
      console.log("no match found - check your mousePressed() function!");
  }
}

function splash() {
  // this is what you would see when the game starts
  fill(0);
  background(20, 20, 300);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 4);
  textSize(32);
  text("Splash Screen", width/2, height/2);
}

function play() {
  // this is what you see when the game is running 
  background(0, 200, 0);
  fill(0, 0, 200)
  textAlign(CENTER);
  textSize(16);
  text("This is where the Game happens", width / 2, height / 2);

}

function gameOver() {
  background(600, 0, 0);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width/2, height/2);
}

function mousePressed() {
  if (gameState === "splash") {
    gameState = "play";
  } else if (gameState === "play") {
    gameState = "gameOver";
  } else if (gameState === "gameOver") {
    gameState = "splash";
  }
}

