/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name: Sara Ali
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

let gameState = "splash";
let player1;
let gameTimer; 

function setup() {
  createCanvas(600, 400);
  player1 = new Player(width / 2, height * 4 / 5);
  gameTimer = new Timer(5000); // 5 second timer
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
  fill(0, 0, 200) //changes the color of the text
  textAlign(CENTER);
  textSize(16);
  text("This is where the Game happens", width / 2, height / 2);

  // this is needed to show the player1 sprite on the screen
  player1.display();

  player1.x = mouseX;
  player1.y = mouseY;

  if (keyIsPressed) {
    switch (keyCode) {
      case UP_ARROW:
        player1.thrust(); // accelerate
        break;
      case DOWN_ARROW:
        player1.brake();
        break;
      case LEFT_ARROW:
        player1.angle -= 0.02; // turn left
        break;
      case RIGHT_ARROW:
        player1.angle += 0.02; // turn right
        break;
      default:
        console.log("Use the arrow keys to move");
    }
  }
  player1.move(); // helps move the player

  //this will check if game timer has finished
  if (gameTimer.isFinished()) {
    gameState = "gameOver";
  }

  //displays elapsed time without decimals
  textAlign(LEFT);
  text("elapsed time: " + gameTimer.elapsedTime, 40, 100);
  // show elapsed time in top left corner
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
    gameTimer.start(); // starts the timer when the game begins
  } else if (gameState === "play") {
    // gameState = "gameOver"; //commented out to disable transition to game over state via mouse click
  } else if (gameState === "gameOver") {
    gameState = "splash";
  }
}

function Player(tempX, tempY) {
  // properties
  this.x = tempX;
  this.y = tempY;
  this.diam = 50;
  this.angle = 0;
  this.xSpeed = 0;
  this.ySpeed = 0;

  this.display = function () {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    fill(0);
    let r = this.diam / 2;
    let x1 = cos(PI + HALF_PI) * r;
    let y1 = sin(PI + HALF_PI) * r;
    let x2 = cos(PI / 6) * r;
    let y2 = sin(PI / 6) * r;
    let x3 = cos(PI * 5 / 6) * r;
    let y3 = sin(PI * 5 / 6) * r;
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(x3, y3);
    endShape();
    pop();
  }

  this.move = function () {
    // Follow the mouse for now
    this.x = mouseX;
    this.y = mouseY;

    // Add code to keep the player on the canvas
    if (this.x > width || this.x < 0)
      this.x = abs(this.x - width);
    if (this.y > height || this.y < 0)
      this.y = abs(this.y - height);
  }

  this.thrust = function () {
    let horiz = Math.sin(this.angle);
    let vert = Math.cos(this.angle);
    this.xSpeed += 0.02 * horiz;
    this.ySpeed -= 0.02 * vert;
  }

  this.brake = function () {
    if (this.xSpeed > 0)
      this.xSpeed -= 0.01;
    else
      this.xSpeed += 0.01;
    if (this.ySpeed > 0)
      this.ySpeed -= 0.01;
    else
      this.ySpeed += 0.01;
  }
}

// Timer class definition
class Timer {
  constructor(duration) {
    this.duration = duration;
    this.startTime = 0;
    this.isRunning = false;
    this.elapsedTime = 0;
  }

  start() {
    this.startTime = millis();
    this.isRunning = true;
  }

  isFinished() {
    if (this.isRunning) {
      this.elapsedTime = millis() - this.startTime;
      if (this.elapsedTime >= this.duration) {
        this.isRunning = false;
        return true;
      }
    }
    return false;
  }
}
