const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground,rope,fruit,bunny;

function preload()
{
  bgImg=loadImage("background.png");
  wMelon=loadImage("melon.png");
  rabbitImg=loadImage("Rabbit-01.png");
  blinkAni = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eatAni = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sadAni = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  blinkAni.playing = true;
  eatAni.playing = true;
  sadAni.playing = true;

  sadAni.looping = false;
  eatAni.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER)
  ground = new Ground(250,690,500,20)
  rope = new Rope(6,{x:245,y:40})

  fruit=Bodies.circle(300,300,15,{density:0.001})
  World.add(world,fruit)

  fruit_con = new Link(rope,fruit);

  blinkAni.frameDelay = 20;
  sadAni.frameDelay = 20;
  eatAni.frameDelay = 20;

  bunny = createSprite(250,550,100,100)
  bunny.addAnimation("blinking",blinkAni);
  bunny.addAnimation("eating",eatAni);
  bunny.addAnimation("crying",sadAni);
  bunny.changeAnimation("blinking");
  bunny.scale=0.25;

  button =createImg("cut_btn.png") 
  button.position(220,30)
  button.size(50,50)

  button.mouseClicked(drop)
}


function draw() 
{
  background(51);
  image(bgImg,width/2,height/2,500,700)

  Engine.update(engine);
  ground.display();
  rope.show();
  //ellipse(fruit.position.x,fruit.position.y,15,15) 
if(fruit!=null)
{
  image(wMelon,fruit.position.x,fruit.position.y,60,60)

}
  if(collide(fruit,bunny)===true)
  {
    bunny.changeAnimation("eating")
  }
  if(collide(fruit,bunny)===true)
  {
    bunny.changeAnimation("crying")
  }
  drawSprites();
}
function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con=null;
} 

function collide(body,sprite)
{
  if(body!=null)
  {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    console.log(d)
    if(d <= 80)
    {
      World.remove(world,fruit);
      fruit=null;

      return true
    }else{
      return false
    }
  }
}

