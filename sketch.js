var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY=1,END=0;
var gameState=PLAY;

var restart,restart_image;
var gameOver,gameOver_image; 

var pos,canvas,asdf ;

function preload(){
  trex_running = loadAnimation("images/trex1.png","images/trex3.png","images/trex4.png");
  trex_collided = loadImage("images/trex_collided.png");
  
  groundImage = loadImage("images/ground2.png");
  
  cloudImage = loadImage("images/cloud.png");
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.png");
  obstacle6 = loadImage("images/obstacle6.png");
  
  restart_image = loadImage("images/restart.png");
  gameOver_image = loadImage("images/gameOver.png");
}

function setup() {
  canvas = createCanvas(600, 200);

  asdf = createSprite(300,100,600,200);
  asdf.visible = false;
  
  trex = createSprite(50,50,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(1100,180,600,20);
  ground.addImage("ground",groundImage);
  //ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,600,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  restart=createSprite(300,130,40,40);
  restart.addImage(restart_image);
  restart.scale=0.5;
  restart.visible=false;
  
  gameOver=createSprite(300,100,20,20);
  gameOver.addImage(gameOver_image);
  gameOver.scale=0.8;
  gameOver.visible=false;
  
  score = 0;
}

function draw() {
  background("white");
  text("Score: "+ score, trex.position.x+450,50);
  pos = trex.position.x;
  gameOver.position.x = pos+250;
  restart.position.x = pos+250;
  trex.setCollider("circle",0,0,40);

  trex.velocityX = 6;

  asdf.position.x = pos + 250;

  camera.position.x = trex.position.x + 250;

  invisibleGround.position.x = pos+250;
  console.log(pos,invisibleGround.position.x);
  
  if(gameState==PLAY){
  score += 1;
    
    
  if(keyDown("space")&&trex.y>159) {
    trex.velocityY = -12;
  }   
  if(mousePressedOver(asdf)&&trex.y>159) {
    trex.velocityY = -12;
  }      

  trex.velocityY = trex.velocityY + 0.8
  
  if((pos-50)%1620 == 0 && pos!=0){
    ground.position.x = pos +1000;
    console.log("xx")
  }
  
  trex.collide(invisibleGround);
    
  spawnClouds();
  spawnObstacles();
    
  if(obstaclesGroup.isTouching(trex)){
    gameState=END;
   }
  }
 else if(gameState==END){
   trex.changeAnimation("collided");
   trex.velocityY=0;
   trex.velocityX=0;

   obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
   
   gameOver.visible=true;
   restart.visible=true;
   
   if(mousePressedOver(restart)){
     reset();
   }
 }
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if ((pos-50)% 150 == 0 ) {
    var cloud = createSprite(pos+550,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if((pos-50)% 300 == 0) {
    var obstacle = createSprite(pos+560,165,10,40);
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
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

function reset(){
  gameState=PLAY;    
  
  trex.changeAnimation("running");
  
  gameOver.visible=false;
  restart.visible=false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score=0;
  
}
