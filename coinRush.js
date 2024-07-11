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
var CanvasRect = Canvas.getBoundlingClientRect();
var CanvasContext = Canvas.getContext("2d");

function intro(){
  function homepage(event){
    var numOfEvent = 0;
    CanvasContext.globalAlpha = 1;
    CanvasContext.fillStyle = "white";
    CanvasContext.fillRect(0,0,Canvas.width,Canvas.height);
    CanvasContext.strokeStyle = "black";
    CanvasContext.strokeRect(45,150,240,160);
    CanvasContext.strokeRect(330,150,240,160);
    CanvasContext.strokeRect(615,150,240,160);
    CanvasContext.strokeRect(45,355,240,160);
    CanvasContext.strokeRect(330,355,240,160);
    //CanvasContext.strokeRect(615,355,240,160); Additional 6th button
    CanvasContext.fillStyle = "black";
    CanvasContext.textAlign = "center";
    CanvasContext.font = "45px Arial";
    CanvasContext.fillText("Coin Rush",450,75);
    CanvasContext.textBaseline = "middle";
    CanvasContext.fillText("20s timer",165,230);
    CanvasContext.fillText("1m timer",450,230);
    CanvasContext.fillText("5m timer",735,230);
    CanvasContext.fillText("Credits",165,435);
    CanvasContext.fillText("Instructions",450,435);
    //CanvasContext.fillText(":)",735,435); Additional 6th button
    if((event.clientX - CanvasRect.left) && (event.clientY - CanvasRect.top)){
      if(numOfEvent = 0){
        Canvas.addEventListener("click",startGame);
      }
      numOfEvent = 1;
    }
    else{
      Canvas.removeEventListener("click",startGame);
      numOfEvent = 0;
    }
  }
  function credits(event){
    
  }
  function instructions(event){
    
  }
  homepage();
}

intro();
