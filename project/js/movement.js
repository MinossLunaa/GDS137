var canvas;
var context;
var timer;
var interval = 1000/60;
var vx = 5;
var vy = 5;

var showHitboxes = true;

var bam = document.getElementById("bam");
var player;
var enemy1;
var beam;

var hp = 100;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//name                    x    y               w    h  color
player = new GameObject(300, canvas.height/2, 50, 50, "red");
enemy1 = new GameObject(canvas.width - 300, canvas.height/2, 50, 50, "green");

timer = setInterval(animate, interval);

function animate(){

    context.clearRect(0,0,canvas.width, canvas.height);

    context.font = "20px Arial";
    context.fillText(hp, enemy1.x, enemy1.y -45);

    if(w){player.y -= vy;}
    if(s){player.y += vy;}
    if(a){player.x -= vx;}
    if(d){player.x += vx;}

    context.drawImage(bam, player.x - 49, player.y - 51, player.width * 2, player.height * 2);

    if(click){
        var fireAngle = mouseRotation - Math.PI / 2;
        var beam = new GameObject(player.x * 1.5, player.y, 700, 3, "red", mouseRotation);

        if(showHitboxes == true){
        context.save();
            context.fillStyle = beam.color;
            context.translate(player.x, player.y);
            context.rotate(fireAngle);
            context.fillRect((-beam.width / 4 + 150), (-beam.height / 2), beam.width - 205, beam.height);
        context.restore();
        }

        if(beam.collide(enemy1)){
        hp = hp - 2;
        }
    }

    wallBorder(player);

    player.drawPlayer();
    enemy1.drawRect();
}
