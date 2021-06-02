var backgroundImg, player;
var rock, rockImg, rockGroup;
var redBalloons, redBalloonGroup, redImg;
var blueBalloons, blueBalloonGroup, blueImg;

var START = 0
var PLAY = 1;
var LOSE = 2;
var WIN = 3;

var gameState = START;
score = 0;

function preload() {
  backgroundImg = loadImage("background.jpg");
  redImg = loadImage("red.png");
  blueImg = loadImage("blue.png");
  rockImg = loadImage("rock.png");
  playerImg = loadImage("player.png");
  birdImg = loadImage("bird.png");

  poppingSound = loadSound("popping.mp3");
  birdSound = loadSound("bird.wav");

  redBalloonGroup = new Group;
  blueBalloonGroup = new Group;
  rockGroup = new Group;
  birdGroup = new Group;
}
function setup() {
  createCanvas(displayWidth,displayHeight);

  player = createSprite(displayWidth/2,displayHeight/2+300,40,40);
  player.addImage(playerImg);
  player.scale = 0.5;
}

function draw() {
  background(backgroundImg);
  console.log(score);

  if(gameState === START){
    textSize(40);
    fill(0);
    text("Use left and right arrow keys to move",displayWidth/4,displayHeight/3.5);
    text("and press 'Space' to throw rocks and pop 10 balloons",displayWidth/5,displayHeight/3);
    text("DON'T HIT THE BIRDS",displayWidth/3,displayHeight/2.5);
    text("Press 'B' to play",displayWidth/3,displayHeight/2);

    if(keyDown("b")){
      gameState = PLAY;
      score = 0;
    }
  }

  if (gameState === PLAY){
    if(keyDown("space")){
      spawnRock();
    }

    if(keyDown(LEFT_ARROW)){
      player.x -= 5;
    }

    if(keyDown(RIGHT_ARROW)){
      player.x += 5;
    }

    if(rockGroup.isTouching(redBalloonGroup)){
      redBalloonGroup.destroyEach();
      rockGroup.destroyEach();
      score = score+1;
      poppingSound.play();
    }

    if(rockGroup.isTouching(blueBalloonGroup)){
      blueBalloonGroup.destroyEach();
      rockGroup.destroyEach();
      score = score+1;
      poppingSound.play();
    }

    textSize(40);
    fill(0);
    text("Balloons Hit: "+score,displayWidth/20,displayHeight/15);

    spawnRedBaloons();
    spawnBlueBaloons();
    spawnBird();
    drawSprites();

    if(rockGroup.isTouching(birdGroup)){
      birdSound.play();
      gameState = LOSE;
    }

    if(score === 10){
      gameState = WIN;
    }
  }

  if(gameState === LOSE){
    textSize(40);
    fill(0);
    text("YOU LOSE",displayWidth/2,displayHeight/2.5);
    text("Press 'R' to restart",displayWidth/2,displayHeight/2);

    if(keyDown("r")){
      gameState = PLAY;
      score = 0;
    }
  }

  if(gameState === WIN){
    textSize(40);
    fill(0);
    text("YOU WIN!!!",displayWidth/2,displayHeight/2.5);
    text("Press 'R' to restart",displayWidth/2,displayHeight/2);
    score = 0;

    if(keyDown("r")){
      gameState = PLAY;
      score = 0;
    }
  }
}

function spawnRedBaloons(){
  if(frameCount % 40 === 0){
    var redBalloons = createSprite(displayWidth,displayHeight/7,40,40);
    redBalloons.addImage(redImg);
    redBalloons.scale = 0.3;
    redBalloons.velocityX = -6;
    redBalloons.lifetime = 400;
    redBalloonGroup.add(redBalloons);
  }
}

function spawnBlueBaloons(){
  if(frameCount % 40 === 0){
    var blueBalloons = createSprite(displayWidth-displayWidth,displayHeight/3.5,40,40);
    blueBalloons.addImage(blueImg);
    blueBalloons.scale = 0.2;
    blueBalloons.velocityX = +6;
    blueBalloons.lifetime = 400;
    blueBalloonGroup.add(blueBalloons);
  }
}

function spawnRock(){
  var rock = createSprite(player.x,player.y,30,30);
  rock.addImage(rockImg);
  rock.scale = 0.2;
  rock.velocityY = -10;
  rock.lifetime = 400;
  rockGroup.add(rock);
}

function spawnBird(){
  if(frameCount % 100 === 0){
    var bird = createSprite(displayWidth,displayHeight/2.4,40,40);
    bird.addImage(birdImg);
    bird.scale = 0.2;
    bird.velocityX = -6;
    bird.lifetime = 400;
    birdGroup.add(bird);
  }
}