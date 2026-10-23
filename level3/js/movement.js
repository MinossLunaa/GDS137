var canvas;
var context;
var timer;
var interval = 1000/60;
var vx = 5;
var vy = 5;
var p1wins = 0;
var p2wins = 0;

var player1;
var player2;


canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//name                    x    y               w    h               color
player1 = new GameObject(10, canvas.height/2, 10, 100);
player2 = new GameObject(canvas.width - 10, canvas.height/2, 10, 100);
ball = new GameObject(canvas.width/2, canvas.height/2, 25, 25,"#00ff00");
timer = setInterval(animate, interval);

function animate(){

    //move and wipe
    ball.move();
    context.clearRect(0,0,canvas.width, canvas.height);

    //draw a line
    context.save();
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.closePath();
    context.lineWidth = 3;
    context.stroke();
    context.restore();

    context.font = "20px Veranda";
    context.fillText("Player 1  |   Player 2", canvas.width/2 - 80, 30);
    context.fillText(p1wins + "    " + p2wins, canvas.width / 2 - 20, 50);

    if(w){player1.y -= vy;}
    if(s){player1.y += vy;}
    /*if(a){player1.x += -2;}
    if(d){player1.x += 2;}*/

    if(arrowUp){player2.y -= vy;}
    if(arrowDown){player2.y += vy;}

    wallBorder(player1);
    wallBorder(player2);

    paddleHit(player1, ball);
    paddleHit(player2, ball);

    ballBounce(ball);
    
    //draw
    player1.drawRect();
    player2.drawRect();
    ball.drawCircle();
}
