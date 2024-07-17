var character;
var score;
var time;
var zombIndex = 0;
var zombies = [];

var keys = {
  left : false,
  right : false,
  up : false,
  down : false
}

var startGame = function(){
  character = new component(100,100,20,20,"red");
  zombies[0] = new zombie(500,300,20,20,"rgb(100 100 100 / 100%)",5);
  gameCanvas.start();
}

var updateGame = function(){
  gameCanvas.clear();
  if(keys.left || keys.right || keys.up || keys.down){
    if(keys.left || keys.right){
      if(keys.left){
        character.xMove--;
      }
      if(keys.right){
        character.xMove++;
      }
    }
    else {
      character.slowDownX();
    }
    if(keys.up || keys.down){
      if(keys.up){
        character.yMove--;
      }
      if(keys.down){
        character.yMove++;
      }
    }
    else {
      character.slowDownY();
    }
  }
  else {
    character.slowDownX();
    character.slowDownY();
  }
  character.update();
  character.move();
  character.wallHit();
  for(var i = 0; i <= zombIndex; i++){
    zombies[i].chasePlayer();
    zombies[i].update();
  }
  paint();
}

var gameCanvas = {
  canvas : document.getElementById("ZombieTag"),
  start : function(){
    this.context = this.canvas.getContext("2d");
    this.animation = paint();
    updateGame();
    window.addEventListener("keydown", function(event){
      gameCanvas.key = event.key
      if(gameCanvas.key === "ArrowLeft"){
        keys.left = true;
      }
      if(gameCanvas.key === "ArrowRight"){
        keys.right = true;
      }
      if(gameCanvas.key === "ArrowUp"){
        keys.up = true;
      }
      if(gameCanvas.key === "ArrowDown"){
        keys.down = true;
      }
    });    
    window.addEventListener("keyup", function(event){
      gameCanvas.key = event.key
      if(gameCanvas.key === "ArrowLeft"){
        keys.left = false;
      }
      if(gameCanvas.key === "ArrowRight"){
        keys.right = false;
      }
      if(gameCanvas.key === "ArrowUp"){
        keys.up = false;
      }
      if(gameCanvas.key === "ArrowDown"){
        keys.down = false;
      }
    });
    window.addEventListener("keydown", function(e) {
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
      }
    }, false);
  },
  clear : function(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  }
}

class component{
  constructor(x,y,width,height,color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.xMove = 0;
    this.yMove = 0;
    this.wallHit = function(){
      if(this.x < 1){
        this.x = 1;
        this.xMove = 0;
      }
      else if(this.x > 879){
        this.x = 879;
        this.xMove = 0;
      }
      if(this.y < 1){
        this.y = 1;
        this.yMove = 0;
      }
      else if(this.y > 579){
        this.y = 579;
        this.yMove = 0;
      }
    }
    this.slowDownX = function(){
      if(this.xMove > 0){
        this.xMove--;
      }
      else if(this.xMove < 0){
        this.xMove++;
      }
    }
    this.slowDownY = function(){
      if(this.yMove > 0){
        this.yMove--;
      }
      else if(this.yMove < 0){
        this.yMove++;
      }
    }
    this.move = function(){
      this.x += this.xMove;
      this.y += this.yMove;
    }
    this.update = function(){  
      var context = gameCanvas.canvas.getContext("2d");
      context.fillStyle = this.color;
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.fillRect(this.x,this.y,this.width,this.height);
      context.strokeRect(this.x,this.y,this.width,this.height);
    }
  }
}

class zombie extends component{
  constructor(x,y,width,height,color,speed){
    super(x,y,width,height,color);
    this.speed = speed;
    this.distX = 0;
    this.distY = 0;
    this.distance = 0;
    this.chasePlayer = function(){
      this.distX = Math.abs(character.x - (this.x + 10));
      this.distY = Math.abs(character.y - (this.y + 10));
      console.log(this.distX,this.distY);
    }
  }
}

function paint(){
  setTimeout(() => {
    requestAnimationFrame(updateGame);
  }, 1000 / 30);
}

function intro(){
  startGame();
}

intro();
