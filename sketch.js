var boy, boy_running
var ground, grounImage
var obstaclesGroup, obstacle1, obstacle2, obstacle3
var energyGroup, energyImage
var cashGroup, cashImage
var waterGroup, waterImage
var cokeGroup, cokeImage
var score
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var treasureCollection = 0;


function preload(){
    
    boy_running = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png");
   
    groundImage = loadImage("road.png")
    
    cashImage = loadImage("cash.png")
    waterImage = loadImage("water.png")
    energyImage = loadImage("energy.png")
    cokeImage = loadImage("coke.png")

    obstacle1 = loadImage("obstacle1.png")
    obstacle2 = loadImage("obstacle2.png")
    obstacle3 = loadImage("obstacle3.png")
}

function setup() {
 createCanvas(600,200)

 boy = createSprite(50,160,20,50);
 boy.addAnimation("running", boy_running);

ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;

obstaclesGroup = createGroup()

cashGroup = new Group()
waterGroup = new Group()
cokeGroup = new Group()
energyGroup = new Group()

score = 0

}

function draw() {
    background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    createCash()
    createWater()
    createEnergy()
    createCoke()
    
    //jump when the space key is pressed
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
        //jumpSound.play();
    }
    
    //add gravity
    boy.velocityY = boy.velocityY + 0.8
    
    //spawn obstacles on the ground
    spawnObstacles();


    if (cashGroup.isTouching(boy)) {
        cashG.destroyEach();
        treasureCollection = treasureCollection + 100;
      }
      else if (waterGroup.isTouching(boy)) {
        waterGroup.destroyEach();
        treasureCollection = treasureCollection + 50;
        
      }
      else if (energyGroup.isTouching(boy)) {
        energyGroup.destroyEach();
        treasureCollection = treasureCollection + 50;
      }
      else if(cokeGroup.isTouching(boy)) {
        jewelryG.destroyEach();
        treasureCollection= treasureCollection - 100;
        
      }
    else if(obstaclesGroup.isTouching(boy)){
        boy.velocityY = -12;
        //jumpSound.play();
        gameState = END;
       // dieSound.play()
      
    }
  }
   else if (gameState === END) {
     
      ground.velocityX = 0;
      boy.velocityY = 0
      
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over", 230,250)

      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  //trex.collide(invisibleGround);
  
 // if(mousePressedOver(restart)) {
   //   reset();
   
   drawSprites();
   textSize(20);
   fill(255);
   text("Treasure:"+ treasureCollection,10,30);

}

function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -(6 + score/100);
      
       //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }

   function createCash() {
    if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImage);
    cash.scale=0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashGroup.add(cash);
    }
  }
  
  function createWater() {
    if (World.frameCount % 320 == 0) {
    var water = createSprite(Math.round(random(50, 350),40, 10, 10));
    water.addImage(waterImage);
    water.scale=0.03;
    water.velocityY = 3;
    water.lifetime = 150;
    waterGroup.add(water);
  }
  }
  
  function createEnergy() {
    if (World.frameCount % 410 == 0) {
    var energy = createSprite(Math.round(random(50, 350),40, 10, 10));
    energy.addImage(energyImage);
    energy.scale=0.13;
    energy.velocityY = 3;
    energy.lifetime = 150;
    energyGroup.add(energy);
    }
  }

  function createCoke() {
    if (World.frameCount % 410 == 0) {
    var coke = createSprite(Math.round(random(50, 350),40, 10, 10));
    coke.addImage(cokeImage);
    coke.scale=0.13;
    coke.velocityY = 3;
    coke.lifetime = 150;
    cokeGroup.add(coke);
    }
  }


 