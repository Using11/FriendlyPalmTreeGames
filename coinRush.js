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
  character = new component(120,120,20,20,false,"rgb(255 0 0 / 100%)");
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
      character.xMove++;
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
    this.context = canvas.getContext("2d");
    this.animation = paint();
    updateGame();
    this.addEventListener("keydown", function(event){
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
    this.addEventListener("keyup", function(event){
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
  },
  clear : function(){
    this.context.clearRect(0,0,canvas.width,canvas.height);
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
    context.fillStyle = this.color;
    context.strokeStyle = "black";
    context.lineWidth = 2;
    if(rectBool){
      context.fillRect(this.x,this.y,this.width,this.height);
      context.strokeRect(this.x,this.y,this.width,this.height);
    }
    else{
      context.beginPath();
      context.arc(x,y,width,height,360);
      context.fill();
      context.arc(x,y,width,height,360);
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
Canvas.addEventListener("click",startGame);
