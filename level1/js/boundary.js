var canvas;
var context;
var timer;
var interval = 1000/60;
var ball;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
ball = new Ball();

ball.vx = -5;
ball.vy = 5;

timer = setInterval(animate, interval);

function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.move();

    if(ball.x > canvas.width - ball.width / 2){
        ball.vx = -ball.vx;
    }
    if(ball.x < ball.width / 2){
        ball.vx *= -1;
    }
    if(ball.y > canvas.height - ball.height / 2){
        ball.vy = -ball.vy;
    }
    if(ball.y < ball.height / 2){
        ball.vy *= -1;
    }
    
    ball.draw();
}
