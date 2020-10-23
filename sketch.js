
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, ground, invisibleGround;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //createCanvas(400,400);
  
  score = 0;
  
  monkey = createSprite(70,350);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.setCollider("circle",0,0,10);
  
  ground = createSprite(400,390,900,10);
  ground.x=ground.width/2;
  
  invisibleGround = createSprite(50,380,600,40);
  invisibleGround.visible = false;
  
  
  FoodGroup = new Group();
  obstacleGroup = new Group();

  
}


function draw() {
background(255);
  
  score = Math.round(frameCount/4);
  text("survival time : "+ score, 300,50);
  
  monkey.velocityY = 10;
  monkey.collide(invisibleGround);
  
  ground.velocityX = -7;
  console.log(ground.x);
  
if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -3; 
  }
  
  spawnFood();
  spawnObstacles();
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    }
  
if(monkey.isTouching(obstacleGroup)){
      ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
   frameCount = score*4;
  monkey.velocityY = 0;
  FoodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
}
else if(keyDown("space")){
    monkey.velocityY = -3; 
  }
  
  drawSprites();
}

function spawnFood(){
  if(frameCount%80===0){
    banana = createSprite(700,0);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -7;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    
    banana.lifetime = 99;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  
 if(frameCount%300===0){
    obstacle = createSprite(700,346);
    obstacle.velocityX = -7;
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    
    monkey.depth = obstacle.depth;
   obstacle.lifetime = 99;
   obstacle.setCollider("rectangle",0,0,600,600);
   //obstacle.debug = true;
   
   obstacleGroup.add(obstacle);
   }
  }



