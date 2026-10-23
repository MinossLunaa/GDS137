var canvas;
var context;
var timer;
var interval = 1000/60;
var player1;
var prevX;
var prevY;
var vx = 5;
var vy = 5;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//name                    x    y               w    h               color
player1 = new GameObject(10, canvas.height/2, 10, 100);
ball = new GameObject(canvas.width / 2, canvas.height/2, 25, 25,"#00ff00");

timer = setInterval(animate, interval);

function animate(){

    ball.move();
    //clear canvas
    context.clearRect(0,0,canvas.width, canvas.height);

    if(w){
        player1.y -= vy;
    }
    if(s){
        player1.y += vy;
    }
    /*if(a){
        player1.x += -2;
        console.log("left")
    }
    if(d){
        player1.x += 2;
        console.log("right")
    }*/

    //player wall collisions
    if(player1.x > canvas.width - player1.width / 2 ||
       player1.x < player1.width / 2 ||
       player1.y > canvas.height - player1.height / 2 ||
       player1.y < player1.height / 2)
    {
        player1.x = prevX;
        player1.y = prevY;
    } else
    {
        prevX = player1.x;
        prevY = player1.y;
    }

    //ball collisions
    if(ball.collide(player1)){
        if(ball.y < player1.y - 17){
            ball.vy = -7;
            console.log("top hit");
        }
        else if(ball.y > player1.y + 17){
            ball.vy = 7;
            console.log("bottom hit");
        }
        else{
            ball.vy = 0;
            console.log("mid hit");
        }
        ball.vx = -ball.vx;
    }

    if(ball.x < ball.width / 2){
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
    }
    if(ball.x > canvas.width - ball.width / 2){
        ball.vx = -ball.vx;
    }
    if(ball.y > canvas.height - ball.height / 2){
        ball.vy = -ball.vy;
    }
    if(ball.y < ball.height / 2){
        ball.vy *= -1;
    }
    
    //draw
    player1.drawRect();
    ball.drawCircle();
}
