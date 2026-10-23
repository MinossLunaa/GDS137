var canvas;
var context;
var timer;
var interval = 1000/60;
var vx = 5;
var vy = 5;

var showHitboxes = true;

var bam = document.getElementById("bam");
var player;


canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//name                    x    y               w    h  color
player = new GameObject(300, canvas.height/2, 50, 50, "red");
timer = setInterval(animate, interval);

function animate(){

    context.clearRect(0,0,canvas.width, canvas.height);

    if(w){player.y -= vy;}
    if(s){player.y += vy;}
    if(a){player.x -= vx;}
    if(d){player.x += vx;}

    wallBorder(player);

    player.drawPlayer();
}
