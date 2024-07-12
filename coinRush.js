var character;
var startTime;
var nowTime;
var timer;
var timeLeft;
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
  startTime = new Date().getTime();
  character = new component(120,120,20,20,true,"rgb(255 0 0 / 100%)");
  gameCanvas.start();
}

var updateGame = function(){
  gameCanvas.clear();
  nowTime = new Date().getTime();
  timeLeft = nowTime - startTime;
  timeLeft /= 1000;
  timeLeft = Math.ceil(timeLeft);
  if(timeLeft < timer){
    if(keys.left || keys.right || keys.up || keys.down){
      if(keys.left || keys.right){
        if(keys.left){
          character.xMove--;
        }
        if(keys.right){
          character.xMove++;
        }
      }
      else{
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
      else{
        character.slowDownY();
      }
    }
    else{
      character.slowDownX();
      character.slowDownY();
    }
    character.move();
    character.update();
    paint();
  }
  else{
    endgame();
  }
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
    this.slowDownX = function(){
      if(this.xMove > 0){
        this.xMove *= 0.7;
        this.xMove = Math.floor(this.xMove);
      }
      else if(this.xMove < 0){
        this.xMove *= -1;
        this.xMove *= 0.7;
        this.xMove = Math.ceil(this.xMove);
        this.xMove *= -1;
      }
    }
    this.slowDownY = function(){
      
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
  CanvasContext.strokeStyle = "black";
  CanvasContext.fillStyle = "white";
  function homepage(){
    CanvasContext.clearRect(0,0,Canvas.width,Canvas.height);
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
        timer = 180;
        startGame();
      }
      else if(event.clientX - CanvasRect.left >= 45 && event.clientX - CanvasRect.left <= 285 && event.clientY - CanvasRect.top >= 355 && event.clientY - CanvasRect.top <= 515){
        credits();
      }
      else if(event.clientX - CanvasRect.left >= 330 && event.clientX - CanvasRect.left <= 570 && event.clientY - CanvasRect.top >= 355 && event.clientY - CanvasRect.top <= 515){
        instructions();
      }
      else if(event.clientX - CanvasRect.left >= 615 && event.clientX - CanvasRect.left <= 855 && event.clientY - CanvasRect.top >= 355 && event.clientY - CanvasRect.top <= 515){
        leaderboard();
      }
      Canvas.removeEventListener("click",homepageAdvance);
    }
    CanvasContext.strokeRect(45,150,240,160);
    CanvasContext.strokeRect(330,150,240,160);
    CanvasContext.strokeRect(615,150,240,160);
    CanvasContext.strokeRect(45,355,240,160);
    CanvasContext.strokeRect(330,355,240,160);
    CanvasContext.strokeRect(615,355,240,160);
    CanvasContext.fillStyle = "black";
    CanvasContext.textAlign = "center";
    CanvasContext.font = "45px Arial";
    CanvasContext.fillText("Coin Rush",450,75);
    CanvasContext.textBaseline = "middle";
    CanvasContext.fillText("20s timer",165,230);
    CanvasContext.fillText("1m timer",450,230);
    CanvasContext.fillText("3m timer",735,230);
    CanvasContext.fillText("Credits",165,435);
    CanvasContext.fillText("Instructions",450,435);
    CanvasContext.fillText("Leader",735,413);
    CanvasContext.fillText("board",735,457);
    Canvas.addEventListener("click",homepageAdvance);
  }
  function credits(){
    CanvasContext.clearRect(0,0,Canvas.width,Canvas.height);
    function creditsAdvance(event){
    if(event.clientX - CanvasRect.left >= 330 && event.clientX - CanvasRect.left <= 570 && event.clientY - CanvasRect.top >= 395 && event.clientY - CanvasRect.top <= 555){
        homepage();
      }
      Canvas.removeEventListener("click", creditsAdvance);
    }
    CanvasContext.strokeRect(330,395,240,160);
    CanvasContext.fillStyle = "black";
    CanvasContext.textAlign = "center";
    CanvasContext.fillText("Credits:",450,75);
    CanvasContext.textBaseline = "middle";
    CanvasContext.fillText("Back",450,475);
    CanvasContext.fillText("Using11 (creator / dev)",450,175);
    CanvasContext.fillText("Github (platform)",450,250);
    Canvas.addEventListener("click", creditsAdvance);
  }
  function instructions(){
    CanvasContext.clearRect(0,0,Canvas.width,Canvas.height);
    function instructionsAdvance(event){
      if(event.clientX - CanvasRect.left >= 330 && event.clientX - CanvasRect.left <= 570 && event.clientY - CanvasRect.top >= 395 && event.clientY - CanvasRect.top <= 555){
        homepage();
      }
      Canvas.removeEventListener("click", instructionsAdvance);
    }
    CanvasContext.strokeRect(330,395,240,160);
    CanvasContext.fillStyle = "black";
    CanvasContext.textAlign = "center";
    CanvasContext.font = "45px Arial";
    CanvasContext.fillText("Instructions:",450,75);
    CanvasContext.textBaseline = "middle";
    CanvasContext.fillText("Back",450,475);
    CanvasContext.font = "30px Arial";
    CanvasContext.fillText("Use the arrow keys to move around your character",450,150);
    CanvasContext.fillText("Collect as many coins as possible within the time limit",450,225);
    CanvasContext.fillText("You can choose from 20 seconds, 1 minute, and 3 minute times",450,300);
    CanvasContext.fillText("With enough coins, you can be featured on the leaderboard!",450,375);
    Canvas.addEventListener("click", instructionsAdvance);
  }
  function leaderboard(){
    CanvasContext.clearRect(0,0,Canvas.width,Canvas.height);
    function leaderboardAdvance(event){
      if(event.clientX - CanvasRect.left >= 330 && event.clientX - CanvasRect.left <= 570 && event.clientY - CanvasRect.top >= 395 && event.clientY - CanvasRect.top <= 555){
        homepage();
      }
      Canvas.removeEventListener("click", leaderboardAdvance);
    }
    CanvasContext.strokeRect(330,395,240,160);
    CanvasContext.fillStyle = "black";
    CanvasContext.textAlign = "center";
    CanvasContext.font = "45px Arial";
    CanvasContext.fillText("Leaderboard:",450,75);
    CanvasContext.textBaseline = "middle";
    CanvasContext.fillText("Back",450,475);
    CanvasContext.fillText("Coming soon...",450,175);
    CanvasContext.fillText("Submit your score to qualify!",450,250);
    Canvas.addEventListener("click", leaderboardAdvance);
  }
  homepage();
}

var endgame = function(){
  
}

intro();
