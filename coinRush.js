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
var CanvasRect = Canvas.getBoundingClientRect();
var CanvasContext = Canvas.getContext("2d");

function intro(){
  function homepage(){
    CanvasContext.strokeStyle = "black";
    CanvasContext.fillStyle = "white";
    function homepageAdvance(event){
      if(event.clientX - CanvasRect.left >= 45 && event.clientX - CanvasRect.left <= 285 && event.clientY - CanvasRect.top >= 150 && event.clientY - CanvasRect.top <= 310){
        timer = 20;
        startGame();
      }
      else if(event.clientX - CanvasRect.left >= 330 && event.clientX - CanvasRect.left <= 570 && event.clientY - CanvasRect.top >= 150 && event.clientY - CanvasRect.top <= 310){
        timer = 60;
        startGame();
      }
      else if(event.clientX - CanvasRect.left >= 615 && event.clientX - CanvasRect.left <= 855 && event.clientY - CanvasRect.top >= 150 && event.clientY - CanvasRect.top <= 310){
        timer = 300;
        startGame();
      }
      else if(event.clientX - CanvasRect.left >= 45 && event.clientX - CanvasRect.left <= 285 && event.clientY - CanvasRect.top >= 355 && event.clientY - CanvasRect.top <= 515){
        credits();
      }
      else if(event.clientX - CanvasRect.left >= 330 && event.clientX - CanvasRect.left <= 570 && event.clientY - CanvasRect.top >= 355 && event.clientY - CanvasRect.top <= 515){
        instructions();
      }
      Canvas.removeEventListener("click",homepageAdvance);
    }
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
    Canvas.addEventListener("click",homepageAdvance);
  }
  function credits(event){
    
  }
  function instructions(event){
    
  }
  homepage();
}

intro();
