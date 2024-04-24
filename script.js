/**
 
 * Created by: Sara Ali
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
  createCanvas(800, 600);
  // Initialize player object (rocket)
  player1 = new Rocket(width / 2, height * 4 / 5);
  // Set up game timer for 30 seconds
  gameTimer = new Timer(30000); // 30 second timer

  // Set up drop timer for stars (every 1 second)
  dropTimer = new Timer(1000);
}

function draw() {
  background(0);
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
  background(0);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text("Star Dodge", width / 2, height / 3);
  textSize(16);
  text("Avoid the Stars and Survive", width / 2, height / 2);
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
  // Move player with mouse
  player1.x = constrain(mouseX, 0, width);
  player1.y = constrain(mouseY, 0, height);

  // Check if game timer has finished
  if (gameTimer.isFinished()) {
    gameState = "gameOver";
  }

  // Check the drop timer to spawn stars
  if (dropTimer.isFinished()) {
    let s = new Star(random(width), -40); // create a star object
    stars.push(s); // add star to array
    dropTimer.start(); // restart timer for next drop
  }

  // Manage the stars array
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].display();
    stars[i].move();

    // Remove stars that go past the bottom
    if (stars[i].y > height) {
      stars.splice(i, 1); // remove from array
      score++; // increment score by 1
    }

    // Collision detection with player (rocket)
    let d = dist(stars[i].x, stars[i].y, player1.x, player1.y);
    if (d < 30) {
      stars.splice(i, 1); // remove from array
      misses++; // increment misses
      if (misses >= 3) {
        gameState = "gameOver"; // end game if misses reach 3
      }
    }
  }

  player1.display();

  textAlign(LEFT);
  fill(255);
  text("TIME LEFT: " + (gameTimer.duration - gameTimer.elapsedTime) / 1000 + " seconds", 20, 20); // show time left
  text("SCORE: " + score, 20, 40); // show score
  text("MISSES: " + misses, 20, 60); // show misses
}

function gameOver() {
  // Display game over screen
  background(0);
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

function Rocket(tempX, tempY) {
  // Rocket object properties
  this.x = tempX;
  this.y = tempY;
  this.size = 50;
  this.angle = 0;
  this.xSpeed = 0;
  this.ySpeed = 0;

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
}

function Star(tempX, tempY) {
  this.x = tempX;
  this.y = tempY;

  // Display star object
  this.display = function () {
    fill(255, 255, 0);
    noStroke();
    ellipse(this.x, this.y, 40, 40); // Increase size
  }

  // Move star object
  this.move = function () {
    this.y += 13; // Increase y position by speed value
  }
}

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

