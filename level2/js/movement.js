var canvas;
var context;
var timer;
var interval = 1000/60;
var player1;
var prevX;
var prevY;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

player1 = new GameObject(100, canvas.height/2, 50, 200);

//name                     x                    y                 w    h   color
lBlock1 = new GameObject(canvas.width - 750, canvas.height/2+75, 100, 100,"#00ff00");
rBlock1 = new GameObject((canvas.width-350), canvas.height/2, 100, 100, "orange");

timer = setInterval(animate, interval);

function animate(){

    //clear canvas
    context.clearRect(0,0,canvas.width, canvas.height);

    if(w){
        player1.y += -2;
        console.log("up")
    }
    if(s){
        player1.y += 2;
        console.log("down")
    }
    if(a){
        player1.x += -2;
        console.log("left")
    }
    if(d){
        player1.x += 2;
        console.log("right")
    }

    //collisions
    if(lBlock1.collide(player1)){
        lBlock1.color = "yellow";
    }
    else{
        lBlock1.color = "#00ff00";
    }

    if(rBlock1.collide(player1)){
        player1.x = prevX;
        player1.y = prevY;
    }
    else{
        prevX = player1.x;
        prevY = player1.y;
    }
    
    //draw
    player1.drawRect();
    lBlock1.drawCircle();
    rBlock1.drawCircle();
}
