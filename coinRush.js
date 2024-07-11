var character;
var startTime;
var timer;
var creatureLen = 0;
var creatures = [];

var keys = {
  left : false,
  right : false,
  up : false,
  down : false
}

var startGame = function(){
  Canvas.removeEventListener("click",startGame);
  character = new component(120,120,20,20,true,"rgb(255 0 0 / 100%)");
  gameCanvas.start();
}

var updateGame = function(){
  gameCanvas.clear();
  if(keys.left || keys.right || keys.up || keys.down){
    if(keys.left){
      character.xMove--;
    }
    if(keys.right){
      character.xMove++;
    }
    if(keys.up){
      character.yMove--;
    }
    if(keys.down){
      character.yMove++;
    }
  }
  else{
    
  }
  character.move();
  character.update();
  paint();
}

var gameCanvas = {
  canvas : document.getElementById("CoinRush"),
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
};

class component{
  constructor(x,y,width,height,rectBool,color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rectBool = rectBool;
    this.color = color;
    this.xMove = 0;
    this.yMove = 0;
    this.move = function(){
      this.x += this.xMove;
      this.y += this.yMove;
    }
    this.update = function(){
      this.build();
    } 
  }
  build(){
    var context = gameCanvas.canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0,0,gameCanvas.canvas.width,gameCanvas.canvas.height);
    context.fillStyle = this.color;
    context.strokeStyle = "black";
    context.lineWidth = 2;
    if(this.rectBool){
      context.fillRect(this.x,this.y,this.width,this.height);
      context.strokeRect(this.x,this.y,this.width,this.height);
    }
    else{
      context.beginPath();
      context.arc(this.x,this.y,this.width,this.height,360);
      context.fill();
      context.arc(this.x,this.y,this.width,this.height,360);
      context.stroke();
      context.closePath();
    }
  }
}

function paint(){
  setTimeout(() => {
    requestAnimationFrame(updateGame);
  }, 1000 / 30);
}

var Canvas = document.getElementById("CoinRush");
var CanvasContext = Canvas.getContext("2d");
CanvasContext.fillStyle = "white";
CanvasContext.fillRect(0,0,Canvas.width,Canvas.height);
CanvasContext.strokeStyle = "black";
CanvasContext.strokeRect(0,0,350,175);
CanvasContext.strokeRect(0,0,150,100);
CanvasContext.strokeRect(0,0,150,100);
CanvasContext.strokeRect(0,0,150,100);
CanvasContext.fillStyle = "black";
CanvasContext.textAlign = "center";
CanvasContext.font = "35px Arial";
CanvasContext.fillText("Coin Rush",450,75);
Canvas.addEventListener("click",startGame);
