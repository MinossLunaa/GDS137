var canvas;
var context;
var timer;
var interval = 1000/60;
var ball;
var counter = 0;
var counterTag = document.getElementById("counterText");

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
        ball.radius = (Math.random()*100) + 10;
        counter++;
        ball.x = canvas.width - radius;
        console.log(counter);
        //setTimeout prevents getting stuck in walls
        setTimeout(ballDimensions, 700);
    }
    if(ball.x < ball.width / 2){
        ball.vx *= -1;
        ball.radius = (Math.random()*100) + 10;
        counter++;
        ball.x = 0 + radius;
        console.log(counter);
        setTimeout(ballDimensions, 700);
    }
    if(ball.y > canvas.height - ball.height / 2){
        ball.vy = -ball.vy;
        ball.radius = (Math.random()*100) + 10;
        counter++;
        ball.x = canvas.height - radius;
        console.log(counter);
        setTimeout(ballDimensions, 700);
    }
    if(ball.y < ball.height / 2){
        ball.vy *= -1;
        ball.radius = (Math.random()*100) + 10;
        counter++;
        ball.x = 0 + radius;
        console.log(counter);
        setTimeout(ballDimensions, 700);
    }
    counterTag.innerText="collision count: "+counter.toString();

    ball.draw();
}

function ballDimensions(){
    ball.height = ball.radius*2;
    ball.width = ball.radius*2; 
}
