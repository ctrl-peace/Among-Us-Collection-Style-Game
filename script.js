//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject1, fallingObject2;
let score = 0;
let fallingObjectImg1, fallingObjectImg2, bgImg, catcherImg, loseImg, winImg;
let startButton, directionsButton, backButton;
let screen = 0;
let myFont, normalFont;

/* PRELOAD LOADS FILES */
function preload(){
  bgImg = loadImage("assets/bg.jpeg");
  catcherImg = loadImage("assets/catcher.png");
  fallingObjectImg1 = loadImage("assets/fallingObjectG.webp");
  fallingObjectImg2 = loadImage("assets/fallingObjectB.png");
  loseImg = loadImage("assets/lose.gif");
  winImg = loadImage("assets/win.jpeg");
  startImg = loadImage("assets/start.webp");
  myFont = loadFont('assets/impostograph.otf');
  normalFont = loadFont('assets/normal.otf');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

    //Resize images
  bgImg.resize(400, 400);
  catcherImg.resize(70, 0);
  fallingObjectImg1.resize(30, 0);
  fallingObjectImg2.resize(60,0);
  startImg.resize(100,0);

  homeScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  if (screen == 0) {
    if (directionsButton.mouse.presses()) {
      //screen 1 is directions screen
      screen = 1;
      directionsScreen();
    } else if (startButton.mouse.presses()) {
      //screen 2 is play screen 
      screen = 2;
      playScreenAssets();
    }
  } 

  if (screen == 1) {
    if (backButton.mouse.presses()) {
      //screen 0 is home screen
      screen = 0;
      homeScreen();
      backButton.pos = { x: -300, y: -300 };
    }
  }

  if (screen == 2) {
    background(bgImg);
    //If fallingObject reaches bottom, move back to random position at top
  if (fallingObject1.y >= height){
    fallingObject1.y = 0;
    fallingObject1.x = random(50,370);
  fallingObject1.vel.y = random(1, 5);

    score = score - 1;
  }

  if (fallingObject2.y >= height){
    fallingObject2.y = 0;
    fallingObject2.x = random(50,370);
    fallingObject2.vel.y = random(1, 5);
  }

  //move catcher
  if (kb.pressing("left")){
    catcher.vel.x = -3;
  } else if (kb.pressing("right")){
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
    catcher.vel.y = 0;
  }
  
  //stop catcher at edges of screen
  if (catcher.x < 50){
    catcher.x = 50;
  } else if (catcher.x > 350){
    catcher.x = 350;
  }

  //if fallingObject1 collides with catcher, move back to random position at top and gain a point
  if (fallingObject1.collides(catcher)){
    fallingObject1.y = 0;
    fallingObject1.x = random(50,370);
    fallingObject1.vel.y = random(1,5);
    fallingObject1.direction = "down";
    score = score + 1;
  }

  //if fallingObject2 collides with catcher, move back to random position at top and lose a point
  if (fallingObject2.collides(catcher)){
    fallingObject2.y = 0;
    fallingObject2.x = random(50,370);
    fallingObject2.vel.y = random(1,5);
    fallingObject2.direction = "down";
    score = score - 1;
  }
  
  //if fallingObject1 collides with fallingObject2, move back to random position at top and lose a point
  if (fallingObject1.collides(fallingObject2)){
    fallingObject1.direction = "down";
    fallingObject2.direction = "down";
  }

   //Draw score on screen
  fill("purple");
  textSize(25);
  textFont(normalFont);
  text ("Score = " + score, 75, 30);
  noStroke();
  }
  
  //checks if user wins and restarts
  if (score > 19){
    youWin();
    if (mouseIsPressed){
      restart();
    }
  } 

  //checks if user loses
  if (score<0){
    youLose();
  }
}

//create functions
function homeScreen() {
  background(bgImg);
  
  //Create title
  fill('white');
  textAlign(CENTER);
  textSize(100);
  textFont(myFont);
  text("Among Us:", 200, 90);
  textSize(50);
  text("Collection Style", 200, 130);
  
  //Create start button
  startButton = new Sprite(startImg,300,300, 'k');

  //Create directions button
  directionsButton = new Sprite(100,300,120,60, 'k');
  directionsButton.color = "black";
  directionsButton.textColor = "white";
  directionsButton.textSize = 35;
  directionsButton.text = "How to play";
  strokeWeight(2);
  stroke("white");
}

function directionsScreen() {
  background(bgImg);
  startButton.pos = { x: -200, y: -100 };
  directionsButton.pos = { x: -500, y: -100 };
  
  // Draw directions to screen
  fill("white");
  textSize(42);
  textAlign(CENTER);
  text("Move the catcher with the left and \nright arrow keys to gather coins \nto win against the impostor. \navoid the asteroids!", 200, 90);
  noStroke();
  
  //Create back button
  backButton = new Sprite(200,350,120,70, "k");
  backButton.color = "black";
  backButton.textColor = "white";
  backButton.textSize = 30;
  backButton.text = "Back to Home";
  strokeWeight(2);
  stroke("white");
}

function playScreenAssets(){
  background(bgImg);
  startButton.pos = { x: -200, y: -100 };
  directionsButton.pos = { x: -500, y: -100 };
  
  //Create catcher 
  catcher = new Sprite(catcherImg,200,380,"k");
  
  //Create falling objects
  fallingObject1 = new Sprite(fallingObjectImg1,random(50,370),0);
  fallingObject1.color = color(0,128,128);
  fallingObject1.vel.y = 2;
  fallingObject1.rotationLock = true;
  fallingObject1.direction = "down";

  fallingObject2 = new Sprite(fallingObjectImg2,random (width),0);
  fallingObject2.color = color(0,128,128);
  fallingObject2.vel.y = 2;
  fallingObject2.rotationLock = true;
  fallingObject2.direction = "down";
}

function youWin(){
  catcher.pos = {x: -50, y: -50};
  fallingObject1.pos = {x: -150, y: -150};
  fallingObject2.pos = {x: -150, y: -150};
  background(winImg);
  fill("white");
  textFont(normalFont);
  textAlign(CENTER);
  textSize(20);
  text("You win! \nScore: 20", 200, 360);
  textSize(15);
  text("Click the mouse \nanywhere to play again",width-100,20);
  noStroke();
}

function restart (){
  score = 0;
  catcher.pos = {x: 200, y: 380};
  fallingObject1.y = 0;
  fallingObject1.x = (random(50,370));
  fallingObject1.vel.y = random (1,5);
  fallingObject1.direction = "down";
  fallingObject2.y = 0;
  fallingObject2.x = (random(50,370));
  fallingObject2.vel.y = random (1,5);
  fallingObject2.direction = "down";
}

function youLose (){
  catcher.pos = {x: -50, y: -50};
    fallingObject1.pos = {x: -150, y: -150};
    fallingObject2.pos = {x: -150, y: -150};
    background(loseImg);
    textAlign(CENTER);
    textFont(normalFont);
    textSize(30);
    fill("red");
    text("DEFEAT", 200,100);
    fill("white");
    textSize(20);
    text("The impostor wins :(", 200, 350);
    textSize(15);
    text("Click the run \nbutton to play again",width-110,20);
    noStroke();
}