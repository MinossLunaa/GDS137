var canvas;
var context;
var timer;
var interval = 1000/60;
var player;
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
        player.y += -2;
        console.log("up")
    }
    if(s){
        player.y += 2;
        console.log("down")
    }
    if(a){
        player.x += -2;
        console.log("left")
    }
    if(d){
        player.x += 2;
        console.log("right")
    }

    //collisions
    if(lBlock1.collide(player)){
        lBlock1.color = "yellow";
    }
    else{
        lBlock1.color = "#00ff00";
    }

    if(rBlock1.collide(player)){
        player.x = prevX;
        player.y = prevY;
    }
    else{
        prevX = player.x;
        prevY = player.y;
    }
    
    //draw
    player.drawRect();
    lBlock1.drawCircle();
    rBlock1.drawCircle();
}
