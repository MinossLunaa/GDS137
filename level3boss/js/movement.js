var canvas;
var context;
var timer;
var interval = 1000/60;
var gravity = 1;
var friction = 1;
var ballForce = 1;
var img = document.getElementById("ric");
var vx = 0;
var maxSpeed = 10;

var player;
var score = 0;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//name                    x    y               w    h               color
player = new GameObject(canvas.width/2, 550, 250, 40, "cyan");
ball = new GameObject(canvas.width/2, canvas.height/2, 80, 80, "magenta");
timer = setInterval(animate, interval);

function animate(){

    //move and wipe
    ball.move();
    context.clearRect(0,0,canvas.width, canvas.height);

    //draw line
    context.save();
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(player.x, player.y);
    context.lineTo(ball.x, ball.y);
    context.closePath();
    context.lineWidth = 1;
    context.stroke();
    context.restore();

    //score
    context.font = "16px Arial black";
    context.fillStyle = "#555555"
    context.fillText("Score: " + score, 80, 25); 

    //collisions
    wallBorder(player);
    paddleHit(player, ball);
    ballBounce(ball);

    //movement
    if(a){
        vx -= 0.25;
    }
    if(d){
        vx += 0.25;
    }
    vx *= friction;
    player.x += vx;
    
    //draw
    player.drawRect();
    ball.drawCircle();
}
