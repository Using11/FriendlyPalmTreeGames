var character;
var score;
var time;
var zombIndex = 0;
var zombies = [];
var startTime;
var currTime;

var keys = {
  left : false,
  right : false,
  up : false,
  down : false
}

var startGame = function(){
  character = new component(100,100,20,20,"red");
  startTime = new Date().getTime();
  gameCanvas.start();
}

var updateGame = function(){
  gameCanvas.clear();
  currTime = new Date().getTime();
  time = (currTime - startTime) / 1000;
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
  character.move();
  character.wallHit();
  if(time - 3 >= zombies.length * 10 && zombies.length > 0){
    zombIndex++;
    zombies[zombIndex] = new zombie(440,290,20,20,"rgb(100 100 100 / 100%)",3);
  }  
  else if(time > 3 && zombies.length == 0){
    zombies[0] = new zombie(440,290,20,20,"rgb(100 100 100 / 100%)",3);
  }
  if(zombIndex > 0){
    for(var i = 0; i <= zombIndex; i++){
      zombies[i].chasePlayer();
      zombies[i].update();
    }
  }
  if(zombies.length > 0){
    character.touchingZombie();
  }
  character.update();
  if(character.alive == false){
    endgame();
  }
  else{
    paint();
  }
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
    this.alive = true;
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
    this.touchingZombie = function(){
      for(var i = 0;i < zombies.length;i++){
        if(this.x >= zombies[i].x + zombies[i].width && this.x + this.width <= zombies[i].x && this.y >= zombies[i].y + zombies[i].height && this.x + this.height <= zombies[i].y){
          this.alive = false;
          break;
        }
      }
      if(!this.alive){
        endgame();
      }
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
    this.xMove = 0;
    this.yMove = 0;
    this.distX = 0;
    this.distY = 0;
    this.chasePlayer = function(){
      this.distX = Math.abs(character.x - this.x);
      this.distY = Math.abs(character.y - this.y);
      this.xMove = Math.ceil(this.distX / 225) * this.speed;
      this.yMove = Math.ceil(this.distY / 225) * this.speed;
      if(character.x - this.x < 0){
        this.xMove *= -1;
      }      
      if(character.y - this.y < 0){
        this.yMove *= -1;
      }
      this.x += this.xMove;
      this.y += this.yMove;
    }
  }
}

function paint(){
  setTimeout(() => {
    requestAnimationFrame(updateGame);
  }, 1000 / 30);
}

var Canvas = document.getElementById("ZombieTag");
var CanvasRect = Canvas.getBoundingClientRect();
var CanvasContext = Canvas.getContext("2d");

function intro(){
  CanvasContext.strokeStyle = "black";
  CanvasContext.fillStyle = "white";
  function homepage(){
    CanvasContext.clearRect(0,0,Canvas.width,Canvas.height);
    function homepageAdvance(event){
      if(event.clientX - CanvasRect.left >= 45 && event.clientX - CanvasRect.left <= 285 && event.clientY - CanvasRect.top >= 150 && event.clientY - CanvasRect.top <= 310){
        //timer = 20;
        startGame();
      }
      else if(event.clientX - CanvasRect.left >= 330 && event.clientX - CanvasRect.left <= 570 && event.clientY - CanvasRect.top >= 150 && event.clientY - CanvasRect.top <= 310){
        //timer = 60;
        startGame();
      }
      else if(event.clientX - CanvasRect.left >= 615 && event.clientX - CanvasRect.left <= 855 && event.clientY - CanvasRect.top >= 150 && event.clientY - CanvasRect.top <= 310){
        //timer = 180;
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
    CanvasContext.fillText("Zombie Tag",450,75);
    CanvasContext.textBaseline = "middle";
    CanvasContext.fillText("?",165,230);
    CanvasContext.fillText("?",450,230);
    CanvasContext.fillText("?",735,230);
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
    CanvasContext.fillText("Run away from the zombies that chase you",450,225);
    CanvasContext.fillText("More zombies that are stronger will spawn the longer you survive",450,300);
    CanvasContext.fillText("Survive long enough to be featured on the leaderboard!",450,375);
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
  character.xMove = 0;
  character.yMove = 0;
  CanvasContext.clearRect(0,0,Canvas.width,Canvas.height);
  function replay(event){
    if(event.clientX - CanvasRect.left >= 330 && event.clientX - CanvasRect.left <= 570 && event.clientY - CanvasRect.top >= 395 && event.clientY - CanvasRect.top <= 555){
      intro();
    }
    Canvas.removeEventListener("click", replay);
  }
  CanvasContext.strokeStyle = "black";
  CanvasContext.fillStyle = "white";
  CanvasContext.strokeRect(330,395,240,160);
  CanvasContext.textAlgin = "center";
  CanvasContext.fillStyle = "black";
  CanvasContext.font = "45px Arial";
  CanvasContext.fillText("You survived seconds",450,75);
  CanvasContext.fillText("Your final score is: " + score,450,150);
  CanvasContext.textBaseline = "center";
  CanvasContext.fillText("Back",450,475);
  Canvas.addEventListener("click", replay);
}

intro();
