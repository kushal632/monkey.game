
var monkey,monkey_running,moving;
var ground,groundImage;
var banana,bananaImage,bananaGroup;
var obstacle,obstacleImage,obstacleGroup, invisibleGround;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover = "nice try";
var b,bImage
var gr = "press ctrl to restart";

function preload(){
monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
bananaImage = loadImage("banana.png");  
obstacleImage = loadImage("obstacle.png");  
groundImage = loadImage("ground2.png");
bImage = loadImage("jungle.jpg");
  
 
}


function setup() {
  createCanvas(800,400);
  
  b = createSprite(0,0,800,400);
  b.addImage("backgrounds",bImage);
  b.velocityX=-5;
  b.scale=0.7
  b.x=b.width/2;

  ground=createSprite(400,350,800,50);
  ground.velocityX=-5;
  ground.x=ground.width/2;
 //  ground.addImage("ground",groundImage);
  console.log(ground.x);
  

  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  invisibleGround = createSprite(400,360,900,10);
  invisibleGround.visible = false;             
  

 
  
  
}


function draw() {
  background("white");


  
  if (b.x < 100)
  {
    b.x = b.width/2;
  }

  
  
  
  if(keyDown("space")&& monkey.y >= 163)
     {
     monkey.velocityY=-10;
     }
   
  

  monkey.velocityY = monkey.velocityY+0.8;

  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }

  food();
  spawnRocks();

  if(gamestate===PLAY){
    gameover.visible=false;
    gr.visible=false;

  if(bananaGroup.isTouching(monkey)){
      
    bananaGroup.destroyEach();
    survivalTime = survivalTime+2;
  }
}
    if (obstacleGroup.isTouching(monkey)) {
     gamestate=END
     obstacleGroup.destroyEach();
  
  } if(gamestate===END){
    
    monkey.destroy();
    ground.destroy();
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameover.visible=false;
    gr.visible=false;
    stroke("black");
    textSize(20);
    fill("black");
    text("Gameover: " + gameover,180,200);

    stroke("black");
    textSize(20);
    fill("black");
    text("retry: " + gr,180,220);
    
  }

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime,200,50);
  
 
  
         
  
  monkey.collide( invisibleGround);
  drawSprites();
   
}

     
function food(){

   if(World.frameCount%80==0){
 
  banana = createSprite(300,130,20,20);
  banana.addImage(bananaImage); 
  banana.scale=0.1;
  banana.y = Math.round(random(120,200));
  banana.velocityX=-5;
  banana.lifetime=150;

  bananaGroup.add(banana);  
      
  }
}
function spawnRocks(){

  if(World.frameCount%60==0){
    obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);

  }
}
