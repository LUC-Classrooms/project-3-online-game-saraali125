/**
 * Fun 2D Web Game - Save the Stars!
 * Created by: Sara Ali
 * 
 */

// Define game states
let gameState = "splash";
let player1;
let gameTimer; 
let dropTimer; // regulate star drops
let stars = []; // an array to hold star objects
let score = 0; // keep track of points (starting at 0)
let misses = 0; // keep track of misses

function setup() {
  createCanvas(600, 400);
  // Initialize player object (rocket)
  player1 = new Rocket(width / 2, height * 4 / 5);
  // Set up game timer for 30 seconds
  gameTimer = new Timer(30000); // 30 second timer

  // Set up drop timer for stars (every 1 second)
  dropTimer = new Timer(1000);
}

function draw() {
  background(200);
  // Manage game state transitions
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
      console.log("Unknown game state");
  }
}

function splash() {
  // Display splash screen elements
  background(40, 30, 30);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text("SAVE THE STARS!", width / 2, height / 3);
  textSize(16);
  text("THREE STRIKES AND YOURE OUT", width / 2, height / 2);
  fill(255, 255, 0);
  ellipse(50,50,20,20);
  ellipse(500,40,30,30);
  ellipse(550,140,20,20);
  ellipse(95,40,25,25);
  ellipse(140,60,20,20);
  ellipse(240,40,13,13);
  ellipse(340,50,13,13);
  ellipse(240,250,20,20);
  ellipse(40,150,13,13);
  ellipse(100,250,13,13);
  ellipse(40,350,18,18);
  ellipse(400,350,18,18);
  ellipse(210,350,13,13);
  ellipse(510,250,13,13);
  ellipse(370,250,18,18);
  ellipse(50,550,18,18);
}

function play() {
  // Display game elements during gameplay
  background(0, 0, 0);
  // Show player sprite on screen (rocket)
  player1.display();
  // Move player with mouse
  player1.x = mouseX;
  player1.y = mouseY;

  // Check arrow key inputs for player movement
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
        // No default action
    }
  }
  player1.move(); // move the player

  // Check if game timer has finished
  if (gameTimer.isFinished()) {
    gameState = "gameOver";
  }

  // Display elapsed time and score
  textAlign(LEFT);
  fill(255);
  text("TIME LEFT: " + (gameTimer.duration - gameTimer.elapsedTime) / 1000 + " seconds", 20, 20); // show time left
  text("SCORE: " + score, 20, 40); // show score

  // Check the drop timer to spawn stars
  if(dropTimer.isFinished()) {
    let s = new Star(random(width), -40); // create a star object
    stars.push(s); // add star to array
    dropTimer.start(); // restart timer for next drop
  }

  // Manage the stars array
  for(let i = stars.length - 1; i >= 0; i--) { 
    stars[i].display();
    stars[i].move();

    // Remove stars that go past the bottom
    if(stars[i].y > height) {
      stars.splice(i, 1); // remove from array
      score--; // decrement score by 1
      misses++; // increment misses
      if (misses >= 3) {
        gameState = "gameOver"; // end game if misses reach 3
      }
    }

    // Collision detection with player (rocket)
    let d = dist(stars[i].x, stars[i].y, player1.x, player1.y);
    if (d < 50) {
      stars.splice(i, 1); // remove from array
      score += 10; // add 10 points to the score
    }
  }
}

function gameOver() {
  // Display game over screen
  background(200, 0, 0);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text("GAME OVER!", width / 2, height / 2);
  textSize(24);
  text("FINAL SCORE: " + score, width / 2, height * 2 / 3); // show final score
}

function mousePressed() {
  // Start game on mouse click
  if (gameState === "splash") {
    gameState = "play";
    gameTimer.start(); // start the game timer
    dropTimer.start(); // start the drop timer for stars
    score = 0; // reset score to 0 at start of game
    misses = 0; // reset misses to 0 at start of game
  } else if (gameState === "play") {
    // No action during gameplay
  } else if (gameState === "gameOver") {
    // Restart game on mouse click after game over
    gameState = "splash";
  }
}

// Rocket object constructor
function Rocket(tempX, tempY) {
  // Rocket object properties
  this.x = tempX;
  this.y = tempY;
  this.size = 50;
  this.angle = 0;
  this.xSpeed = 0;
  this.ySpeed = 0;

  // Display rocket object
  this.display = function () {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(90, 700, 55); // Change fill color to white
    stroke(90, 700, 55);
    strokeWeight(2);
    ellipse(0, -50, 30, 105); // Oval
    // Triangle
    beginShape();
    vertex(0, -12.5); // Top point
    vertex(15, 12.5); // Bottom right point
    vertex(-15, 12.5); // Bottom left point
    endShape(CLOSE);
    pop();
  }

  // Move rocket object
  this.move = function () {
    // Follow the mouse for now
    this.x = mouseX;
    this.y = mouseY;

    // Keep the rocket on the canvas
    if (this.x > width || this.x < 0)
      this.x = abs(this.x - width);
    if (this.y > height || this.y < 0)
      this.y = abs(this.y - height);
  }

  // Accelerate rocket
  this.thrust = function () {
    let horiz = Math.sin(this.angle);
    let vert = Math.cos(this.angle);
    this.xSpeed += 0.02 * horiz;
    this.ySpeed -= 0.02 * vert;
  }

  // Apply brakes to rocket
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

// Star object constructor
function Star(tempX, tempY) {
  this.x = tempX;
  this.y = tempY;
  this.size = 40;
  this.speed = 11; // Increase speed to make stars move down very fast
//Sometimes when I increase the speed it makes the game freeze but its a great way to test your reflexes
  // Display star object
  this.display = function () {
    fill(255, 255, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  // Move star object
  this.move = function () {
    this.y += this.speed; // Increase y position by speed value
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
