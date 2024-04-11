# Project 3 - Online Game

*Create a simple 2-D game for the web!*

Each student will turn in their own original work. This is not a group project, but I am hoping you will work in teams to troubleshoot and assist each other.

We will complete a series of five lab-type exercises to help move this project along. Each step is relatively simple, but will add some new functionality to your project. The steps are as follows:

1. Start-Play-GameOver (version 0): make your project branch to three different screens based on user action (mouse click). 
2. Player 1 movement (version 1): import a constructor function for a Player object. Make it move on screen in response to user actions (keyboard). 
3. Timers (version 2): import a Timer object constructor and an object to place in an array. Use the timer to control the appearance of objects in the game. 
4. Object Collisions (version 3): check for intersections between objects on the canvas. Make decisions about what to do when a collision is detected. 
5. Scoring (version 4): decide how you want to award (or subtract) points in your game. How does your game end? Place some logic code in a few key places to make your game progressive (moving towards a goal).

**For each stage of this project** you will pick up where you left off. Each time you complete a lab exercise, make a commit on GitHub with the version and title in the commit message. Also, **download a .zip archive** of your work and **submit it in Sakai** as a lab (with a link). This way, you not only document each step (for credit) but you will have saved backups of your project at each critical step.

Each version of this project is worth 10 points in the "Creative Projects" category (30% category) for a total of 50 points. Please make sure you turn in something that works for each stage of this project!

The other 50 points for project 3 depends on your creative enhancements to this game beyond the step-by-step instructions given here.

**Please email me if you want help, comments, or feedback.** dwetzel@luc.edu

## Part 1: Version 0 - Start-Play-GameOver 
_Set up game screen navigation_

The starter template sketch for this project has three separate screens. Each screen represents a different game state:

* the "Splash" screen that you see when the game loads, but before you begin
* the "Play" screen that you see while the game is running
* the "Game Over" screen that you see when the game ends

Your job in this step is to add the code that causes the sketch to move through the three screens one at a time in response to mouse clicks.

1. add a global variable at the top of the sketch called `gameState`. Initialize its value to `"splash"`

``` javascript
var gameState = "splash";
```
2.  In `script.js`, you will find the function `mousePressed()`. Add code to this function that checks the current value of `gameState` and changes it to move on to the next screen.

``` javascript
if(gameState == "splash") { 
    gameState = "play"; 
} // go to "play"
else if(gameState == "play") { 
    gameState = "gameOver"; 
} // go to "gameOver"
else if(gameState == "gameOver") { 
    gameState = "splash"; 
} // go to "splash"
```

3. in the `draw()` function, create a `switch` statement that checks the value of `gameState` and branches to the correct screen function.

``` javascript
switch (gameState)  {
  case "splash" :
    splash(); // go to the "splash" screen
    break;
  case "play" :
    play(); // go to the "play" screen
    break;
  case "gameOver" :
    gameOver(); // go to the "game over" screen
    break;
  default :
    console.log("no match found - check your mousePressed() function!");

}
```

Check your work. Your completed sketch should cycle through all three screens in response to mouse clicks. It should move to the next screen only on a single mouse click.

If you want to take a moment to make the three screens more interesting, go ahead!

### Commit and submit
* commit your work on GitHub. Label this commit "Version 0 -Start-Play-GameOver"
* Download a .zip archive of your project so far and submit it on Sakai for Project 3 credit (10 points).
* include a link to your GitHub repository in the Sakai assignment comments

## Part 2: Version 1 - Player1 movement

_Import a player object and make it move in response to player actions_

In this step, you will import a class definition (object constructor function) linked in a separate .js file, create an instance of that object, and define how it's sprite moves on the canvas in response to user actions.

1. Download the "Player.js" file attached to the assignment in Sakai and add it to your game project on GitHub. You should have it listed in your project's "files" list.
Edit the file `index.html` to include a reference to "`Player.js`" inside the `<body>` section. Look at the line that links "`script.js`" for a model of how to do this.

    The object defined in `Player.js` is meant to get you started. You may (should) replace it with something of your own design.

2. Now create an instance of the `Player` object and make it show up on screen when the game is in "play" mode:

    * Open up the script.js file in replit and add a global variable at the top called `player1`
    * In the `setup()` function, create a new instance of a `Player` object and contain it in `player1`. Give it initial arguments to place it in the _middle_ of the screen, but 4/5 down from the top i.e.,
    
    ```javascript
        player1 = new Player(width/2, height * 4/5);
    ```

    * in the `play()` function, add a line to show the `player1` sprite on screen:

    ```javascript
        player1.display();
    ```
    

3. *Choose your own adventure!* You can make the player object move a lot of different ways, depending on how you want things to work in your own game. Below are three possible ways to control the position of `player1` in response to user actions.

    ### Mouse following. 
    This is the simplest way to control an object on screen. It might be right for your game idea, or you may want to modify this or try something else. How do you do it?
    * in `play()`, right before you call `player1.display()`, add a line that changes the `.x` property of `player1` to the current value of `mouseX`:

        ``` javascript
        player1.x = mouseX;
        ```
    * You could do the same for `player1.y` if it seems appropriate for your game

    ### Arrow Key Jump. 
    This is a little more complex, but it allows you to control the player from the keyboard with the arrow keys (or any other set of keys you like).
    * At the bottom of the `script.js` file, add a new function, called `keyPressed()` to capture single key presses from the user:
        ``` javascript   
        function keyPressed() { }
        ```
    * Inside that function, add a switch function that looks at the keyCode each time a key is pressed:
        ``` javascript
        function keyPressed() {
          switch(keyCode) {}
        }
        ```
    * Create a series of cases for your `switch` statement for the keys you want to use to control the `player1` sprite:

        ``` javascript
        function keyPressed() {
          switch(keyCode) {
            case UP_ARROW :
              // do something
              break;
            case DOWN_ARROW :
              // do something
              break;
        // add more cases for more keys ...
            default : // do this if the key doesn't match the list ...
              console.log("press the arrow keys to move player1");
          }
        }
        ```
    * Add some code to each case that affects the position of `player1` on the canvas:
        ```javascript
        case UP_ARROW :
          player1.y -= 30 // move up 30px
          player1.angle = 0; // no rotation
          if(player1.y < 0) player1.y = height; // wrap to bottom
        break;
        case DOWN_ARROW :
          player1.y += 30 // move down 30px
          player1.angle = PI ; // point down (rotate 180 deg.)
          if(player1.y > height) player1.y = 0; // wrap to top
          break;
        ```
    * do something similar for the LEFT_ARROW and RIGHT_ARROW cases.

    ### Rocket thruster. 
    This one is the challenge round! It isn't really that hard, but it will require just a little more work in a few different places. The basic idea is to use the left and right arrow keys to turn the sprite and use the up and down keys to accelerate and brake. The rotation not only points the sprite in a direction, but sets a direction of travel (there's a wee bit of math involved). The up and down keys just add to or subtract from a speed property of the player object. Here's how to do it:

    * **IMPORTANT:** First disable the `mousePressed()` function if you did option 2 above. Use the `/*` and `*/` comment symbols around it to disable it temporarily. Or simply delete it. That `mousePressed()` function will interfere with what we're doing now.
    * We have to do some work on the `Player()` constructor function to give it some new properties and methods. It's not much code. Hopefully it's not too confusing either. The first thing to do is add **two new properties** to the `Player()` constructor (in `Player.js` at the top, with the other properties such as `this.x` and `this.y`):

        ``` javascript
        this.xSpeed = 0;
        this.ySpeed = 0;
        ```

    * At the bottom of the `Player()` definition, there is a method called `this.move()`. Let's modify it so that it uses our new speed properties:

        change `this.x = mouseX;` to `this.x += this.xSpeed;`
        
        change `this.y = mouseY;` to `this.y += this.ySpeed;`

    * We can also add some code to keep our `player1` sprite on the canvas (in `Player.js: this.move`):

        ```javascript 
        if(this.x > width || this.x < 0)
          this.x = abs(this.x - width);
        if(this.y > height || this.y < 0)
          this.y = abs(this.y - height);
        ```
    * Now we need to add some methods for accelerating and braking. Let's start with the acceleration. 
    * After the `.move()` method (be careful with curly brackets!), add a new method for `thrust()`:

        ``` javascript
        this.thrust = function() {}
        ```
    * Add some code (inside those curly brackets) that first calculates the direction that the sprite is pointing, and then adds a value to the `.xSpeed` and `.ySpeed` properties of the `player1` object:

        ```javascript 
        let horz = Math.sin(this.angle); // calculate a percentage to the left or right
        let vert = Math.cos(this.angle); // calculate a percentage up or down
        this.xSpeed += .02 * horz; // modify the basic acceleration factor (.02) by the amount of rotation
        this.ySpeed -= .02 * vert;
        ```
    * The finished method should look like this:
        ```javascript
        this.thrust = function(){
          let horiz = Math.sin(this.angle);
          let vert = Math.cos(this.angle);
          //use these as a multiplier to the xSpeed and ySpeed
          this.xSpeed += .02 * horiz;
          this.ySpeed -= .02 * vert;
        }
        ```

    * We should add a method for braking. The easiest way would be to declare a new method for `Player()` called `.brake()` and use it to simply subtract a value ("braking factor") from `.xSpeed` and `.ySpeed`. That would work, but once it slows to 0 it will start accelerating backwards. If you want to prevent that, you need just a little bit more logic code:
        ```javascript    
        this.brake = function() {
          if(this.xSpeed > 0)
            this.xSpeed -= .01; // slow down!
          else this.xSpeed += .01 // speed was less than 0, so bring it back up
          if (this.ySpeed > 0)
            this.ySpeed -= 0; // slow down on y axis, too!
          else this.ySpeed += .01; // bring up to 0 if we went too far
        }
        ```
    * Now that we have a modified `.move()` method and new `.thrust()` and `.brake()` methods in our `Player()` constructor (and therefore our `player1` object) we can implement those features in our game! Let's start by calling `player1.move()`; in the `play()` function of the main sketch (`script.js`):
        ```javascript 
        player1.display();
        player1.move();
        ```
    * Go ahead and run your code in a new tab. You won't see anything different, but this is a good point to look for errors in the developer console. No errors? OK! on to the next step: 
    * We're going to add an `if()` statement to the `play()` function looking to see if a key is pressed. Remember that `play()` is an extension of `draw()`, so it is executing 60 times per second, or once per frame. If you are testing for a **key press** in this way, you are looking for a key that is held down so you can do something repeatedly until it is released. That's exactly what we need here. In the ``if()`` statement, we test the state of `keyIsPressed` (a P5 boolean variable) and then pass the `keyCode` (another P5 variable) to a `switch()` statement that does something for each key we want to use. Again, this example uses the arrow keys.
        ```javascript
        if(keyIsPressed)
        {
          switch(keyCode)
          {
            case UP_ARROW:
              player1.thrust(); // accelerate
              break;
            case DOWN_ARROW:
              player1.brake();
              break;
            case LEFT_ARROW:
              player1.angle -= .02; //turn left
              break;
            case RIGHT_ARROW:
              player1.angle += .02; //turn right
              break;
            default:
              console.log("use the arrow keys to move");
           }
        }
        ```
    * Go ahead and reload your sketch to see if it works. You should see the `player1` sprite turning in response to the left and right arrow keys. When you press the up arrow, it should accelerate in the direction it is pointing. When you press the down arrow, it should slow to a stop.

Is your project working so far? Does `player1` appear on the canvas and move in response to either the mouse or the arrow keys? **Awesome!** 

### Commit and submit
* commit your work on GitHub. Label this commit "Version 1 -  player1 movement"
* Download a .zip archive of your project so far and submit it on Sakai for Project 3 credit (10 points).
* include a link to your GitHub repository in the Sakai assignment comments


## Part 3 - Timers

_Using a Timer object to control game action_

In this step, add a timer to control how long the player has to complete the level. There is a `Timer()` constructor in a file called `Timer.js` for you to add to the repository on GitHub (attached to the assignment in Sakai). Take a moment to look at it and get to know its properties and methods. Pay special attention to the `.start()` and `.isFinished()` methods.

1. Upload the `Timer.js` file (attached in Sakai) to your GitHub repository
2. Edit your `index.html` file to include a `<script>` tag reference to your Timer in the `<body>` section of the document:

    ```javascript
    <script src="Timer.js"></script>
    ```
3. In your `script.js` file, add a **`global variable`** to store the timer object. Call it `gameTimer`

    ```javascript
    var gameTimer;
    ```
4. in `setup()`, create an object instance of `Timer()` and assign it to your variable. The `Timer()` constructor takes an **argument** to set the initial time for its countdown in **milliseconds**. What number value should you give as an argument? You can decide for yourself, but 5 seconds (5000 ms) is good for testing.

    ```javascript
    timer = new Timer(5000); // 5 second timer
    ```
5. In `mousePressed()`, start the timer with its `.start()` method when the game begins:

    ```javascript
    if (gameState == "splash") {
      gameState = "play"; // go to the play() screen
      timer.start(); // starts the timer
    }
    ```

6. Also in the `mousePressed()` function, use an *inline comment* to **disable** the "`else if`" statement that checks for `gameState == "play"` and sends it to "`gameOver`"

    ``` javascript
    else if (gameState == "play") {
      // gameState = "gameOver";
    }
    ```
7. In `play()`, check your `gameTimer` with an `if()` statement. If the time is up, set `gameState` to `"gameOver"`

    ```javascript
    if (timer.isFinished()) {
      gameState = "gameOver"
    }
    ```

8. Also in `play()`, display the elapsed time on screen with `text()`:

    ```javascript
    textAlign(LEFT);
    text("elapsed time: " + timer.elapsedTime, 40, 100);
    // show elapsed time in top left corner
    ```
9. Try out your game. When you start game (click on the "Splash" screen) you should see the play screen with a timer. When the timer reaches the limit it should automatically jump to "Game Over."

### Challenge:

* How would you increase the time limit on the game so it lasts more than 5 seconds?
* How could you display the remaining time (count down) instead of the elapsed time?

### Commit and submit
* commit your work on GitHub. Label this commit "Version 2 -  Timers"
* Download a .zip archive of your project so far and submit it on Sakai for Project 3 credit (10 points).
* include a link to your GitHub repository in the Sakai assignment comments

## Part 4, Version 3 - Arrays and Object collisions_

_Add new objects to your game, detect the intersection of two objects and decide what to do about it_

In this lab, you will add an **array** of objects to the game, control them with a timer and a `for()` loop, and add some code to detect the **intersection** of your `player1` object with the new objects in the game.

1. import another new constructor function in an external .js file (like we did with `Player.js`). You might want to make your own, but use this one for now and consider using it as a model. This one is called `Box()` and it lives in a file called "`Box.js`." The file is attached to this assignment (in Sakai).

    * Download `Box.js` and then import it into your Project 3 in GitHub.

2. Remember that every time you add a new file to your project you have to link it from your `index.html` file. 
    * Open up `index.html` from your project file list. In the `<body>` section, add a line that links the new file:

        ```html
        <script src = "Box.js"></script>
        ```

3. In `script.js`, go to the top of the script where the **global variables** are declared (`gameState`, `player1`, etc). Add a new line for each of these new variables:

    ```javascript
    var testBox; // a box to preview on the splash screen
    var dropTimer; // regulate box drops
    var presents = new Array(0); // an empty array called "presents"
    ```

4. In `setup()`, assign a new Timer object to `dropTimer`, and set it for 1000 ms (1 second). This assumes you already added the `Timer()` constructor to your project in the previous lab tutorial.

    ```javascript
    dropTimer = new Timer(1000);
    ```

5. Also in `setup()`, make a test version of our `Box()` object to show on the splash screen. This will prove that the box object works properly.

    ```javascript
    testBox = new Box(width/2, height/3);
    ```
6. Run your project in a separate tab with the **developer console open** and look for errors. No errors? Awesome. 

7. Add the test box to the splash screen so we know what it looks like. In the `splash()` function, towards the bottom, add these two lines:

    ``` javascript
    testBox.display();
    testBox.spin();
    ```
     ... and run your project again. You should see a little present rotating above the splash screen text.

8. Here's where it gets interesting, so **pay attention!** We're going to use the `dropTimer` object to control an array of presents falling from the sky. It's very similar to the `gameTimer` we made previously, but we will use it for a different purpose. Here we go! Scroll down to the `mousePressed()` function. You should already have an `if()` statement looking for a condition in which `(gameState == "splash")`. Add a line to that same `{block}` that starts the `dropTimer` as well as the original `gameTimer`. It should look like this:

    ```javascript
    if (gameState == "splash") {
      gameState = "play"; // go to the play() screen
      gameTimer.start(); // start the game timer
      dropTimer.start(); // start the drop timer for presents
    }
    ```

9. In the `play()` function, we are going to check the drop timer. If the drop timer (`dropTimer`) is finished (`.isFinished()`), we will add a new present to the array and re-start the timer.

    ```javascript
    if(dropTimer.isFinished()) {
      let p = new Box(random(width), -40);
      // new box, anywhere across the width of the canvas, but 40px above the canvas
      presents.push(p); // add object 'p' to the 'presents' Array
      dropTimer.start(); // restart timer for next drop
    }
    ```

10. Now we will manage the `presents` array with a `for()` loop. Each time through the loop, we will operate on an individual **element** of the `presents` array. Let's make sure our array is working and the objects behave properly on screen. Let's keep it simple at first and add some features later. First, make a `for()` loop:

    ```javascript
    for(let i = 0; i < presents.length; i++) { }
    ```
       ... next let's add something useful to this loop:

    ```javascript
    for(let i = 0; i < presents.length; i++) {
      // for each element of the array, represented by 'i', do the following:
      presents[i].display(); // draw it on the canvas
      presents[i].move(); // make it drop
      presents[i].spin() // make it rotate
    }
    ```
    ... go ahead and run your project. Do you see presents falling from the "sky"? Yay!

11. So far, the `play()` screen continuously adds Box objects to the '`presents`' array and the `for()` loop dutifully displays, moves, and spins each one. After a while, this might start to bog down your computer. Let's take care of some "garbage collection" (that's an actual software dev term), and remove presents from the array after they fall past the visible canvas.

    In the `for()` loop, right after `presents[i].spin();`, add an `if()` statement that looks for presents that went past the bottom and then removes them from the array with the `.splice()` method:

    ```javascript
    if(presents[i].y > height) {
      // present went below the canvas
      presents.splice(i, 1);
      // remove 1 element from from "presents" at index 'i'
    }
    ```
    ... your for loop should look like this now:

    ```javascript
    for(let i = 0; i < presents.length; i++) { 
      // for each present in the array, do the following:
      presents[i].display(); // show it on the canvas
      presents[i].move(); // make it fall
      presents[i].spin(); // make it spin

      if(presents[i].y > height) {
        // present went below the canvas
        presents.splice(i, 1); // remove from array
      }
    }
    ```

12. **Last step:** Collision Detection! Let's add one more task to our `for()` loop. Since we are already looking at each object in the `presents` array (one per iteration of the loop), we can take a moment to compare their position to the position of `player1`. If they are close enough together, we can call it a "collision" and take some action. Let's use the `.splice()` method again to simply remove the object from the array when it collides with the `player1` object. First, let's compare locations using the P5 `dist()` function and store its result temporarily in a variable:

    ```javascript
    let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
    ```
    ... next we will set up a conditional statement to see if the result of the `dist()` function meets our criteria for a collision:

    ```javascript
    if (d < 50) {
      // if it's within 50 pixels, do something!
    }
    ```
    ... finally, let's use this condition to remove the object from the array (because the player object intersected with it)
    ```javascript
    if (d < 50) {
      presents.splice(i, 1); // remove 1 item at index 'i'
    }
    ```
    ... the for() loop in play() should look like this now:

13. Go ahead and Run your project in a separate browser tab. Open the developer console to look for error messages. Can you move your player object into position so that it intersects with a falling present? What happens when they cross paths? Does the present disappear?

### Commit and submit
* Commit your work on GitHub. Label this commit "Version 3 -  Object collisions"
* Download a .zip archive of your project so far and submit it on Sakai for Project 3 credit (10 points).
* include a link to your GitHub repository in the Sakai assignment comments

## Part 5, Version 4 - Keeping Score

_Add a "score" variable to keep track of player progress_

In this version of your game, you will add a global variable to keep track of points scored by the player. We can use that number to make decisions about what happens next.

1. Create a new variable to keep track of user progress. At the top of your sketch (`script.js`), add:

    ```javascript
    var score = 0; // keep track of points (starting at 0)
    ```
2. Display the score to the player. At the bottom of your `play()` function, you should have a couple lines of code that display the elapsed time on the game timer (`timer.elapsedTime`).

    ```javascript
    textAlign(LEFT);
    text("Elapsed time: " + timer.elapsedTime, 20, 20); //show elapsed time in ms
    ```
    ... add a line below that to show the score on screen as well:

    ```javascript
    text("Score: " + score, 20, 40);
    ```
3. If you run your sketch, you should see the score at the top left corner of the canvas. However, it won't change until we program it to do so. When the player intersects with a box object in the presents array, the box is removed. You can find that moment in the `play()` function inside the `for()` loop that moves (`.move()`) and displays (`.display()`) all the presents and disposes of them if they reach the bottom or intersect with `player1`. It should look like this:

    ```javascript
    for (let i = 0; i < presents.length; i++) {
      presents[i].display();
      presents[i].move();
      presents[i].spin();

      if (presents[i].y > height) {
        presents.splice(i, 1); // remove from array
      }

      let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
      // d is now the distance in pixels between presents[i] and player1
      if (d < 50) {
        presents.splice(i, 1); // remove the present from the array
      }
    } // end of for() loop
    ```
    ... in the `if()` statement that compares the distance between the present and the player to a set radius (`if(d < 50)`), add a line that increments the score. It should look like this:

    ```javascript
    if (d < 50) {
      presents.splice(i, 1);
      score ++; // add 1 point!
    }
    ```

4. Run your sketch again and see if your scoring mechanism is working. If you have collision detection set up properly (from the previous lab) and you got this far it should be working. Each time you catch a falling present, you should get a point and it should show up on screen in the top left corner. Working? Yay! Make a **GitHub commit** to celebrate!

5. What if you miss one and it gets by you? There is an `if()` statement in the `for()` loop in `play()` that handles that situation.

    ```javascript
    if(presents[i].y > height){
      presents.splice(i, 1); // remove 1 element at index 'i' from the array
    }
    ```
    ... add a line to that block that takes one point away from the total:

    ```javascript
    if(presents[i].y > height){
      presents.splice(i, 1); // remove 1 element at index 'i' from the array
      score--; // decrement score by 1
    }
    ```

6. Run your game and let a few presents go by. You should see the score going down. When you catch one it goes back up again!

7. For now, the game ends when the timer goes off. You may want to change that behavior later, but let's leave it that way for now. However, it would be nice to know what your score was when the game ended. We should also reset it when you start the game again. First, let's show the final score on the `gameOver` screen. In the `gameOver()` function, add a line at the end that displays your score:

    ```javascript
    text("Your final score: " + score, width/2, height * 2/3);
    ```
     ... and run your project again. You should see your final score displayed on the Game Over screen. However, if you start the game again, your score will pick up where you left off. If you want it to start again a 0, we have to do one last thing.

8. Scroll down to where you find the `mousePressed()` function. There is a conditional statement that checks to see if `gameState` is `"splash"` when the mouse is clicked. We're already using that to start the game and its timers. It should look like this:

    ```javascript
    if (gameState == "splash") {
      gameState = "play";
      timer.start(); // start the game timer
      dropTimer.start();
    }
    ```
    ... add a line after dropTimer.start(); that will reset the score to 0. Like so:

    ```javascript
    if (gameState == "splash") {
      gameState = "play";
      timer.start(); // start the game timer
      dropTimer.start();
     score = 0; // reset score to 0 at start of game
    }
    ```
Go ahead and Run your project.

* Do you score points when you catch a present?
* Do you lose points when you miss?
* Does your score display in the top left corner of the play screen and in the middle and lower third of the Game Over screen?
* Does the score reset when you restart the game?

#### If you answered "yes" to all those, congratulations! You have a functional Project 3.

Time to commit on GitHub!

### Commit and submit
* commit your work on GitHub. Label this commit "Version 4 -  Keeping Score"
* Download a .zip archive of your project so far and submit it on Sakai for Project 3 credit (10 points).
* include a link to your GitHub repository in the Sakai assignment comments

## Final Version Project 3 - Online Game
_Add enhancements to the game you have built so far_

Each student will turn in their own original work. This is not a group project, but I am hoping you will work in teams to troubleshoot and assist each other.

If you're OK with a grade of no more than 85% (B), you can turn in the results of Project 3 Starter Pack (v. 0-4) for a very basic but functional game. If you want higher than a 'B', you have to put some personal creativity into it!

### Minimum features of your game project:

* A "splash" screen with an introduction to your game, a "play" screen where the game happens, a "game over" screen that the player sees when the game ends
* Objects that move independently on screen (arrays, individual objects, etc)
* Object constructor code contained in separate .js files (linked to the main sketch by the HTML file)
* An object controlled by the user (in "Pong" it's the paddle, in "Frogger" it's the Frog, in "Space Invaders" it's your ship, etc)
* A Timer that controls something in the game (appearance of additional objects, a time limit on a challenge, etc.)
* An action that the user takes that scores points (eliminate threats, keep a ball in play, reach a goal, etc)
* A display of points on screen (visual feedback)

### Other features that will make your game better (and add points to your total):

* Creative Enhancements  (+1-8 points)
    * Replace the Player object .display() method code with your own graphic design (1-3 points)
    * Replace the Box object .display() method code with your own graphic design (1-3 points)
    * Replace the backgrounds in the 'play,' 'splash,' and 'game over' screens (1-2 points)
* Technical Enhancements (+1-7 points)
    * Multiple levels
    * Multiple objectives
    * Changes to basic game play
    * Multiple objects with different purposes (more than one type of obstacle or objective)
    * Other ideas expressed in code that make the game better

## What to submit:

* a link to your GitHub repository (here in Sakai)
* a short commentary in the submission box to explain your game and the techniques you used to create it. Please cite your sources if you looked at models or borrowed any code.
* a .zip archive of your project uploaded here as an attachment
* a **commit** on GitHub labeled "Project 3 - Final Version".

Please email me (dwetzel@luc.edu) if you want help, comments, or feedback.

### Addendum: Collaboration allowed/encouraged
For this project, I encourage you to find a buddy in this class with whom you might collaborate in any number of ways. First of all, it's good to have someone to brainstorm with. Also, it's great to have someone that can test and help debug/troubleshoot. For this project, I would not object if you actually shared code with one another as long as it is properly credited. For instance, if you have an object constructor that you have created that could be used in a colleague's game, and you would like to share it, go ahead. Just make sure the name of the person that created it is prominently displayed in a code comment. Always give credit for creative contributions from others!

So, while this is not actually a group project, I would be delighted to know that you are actually working together.

