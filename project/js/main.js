var canvas;
var context;
var timer;
var interval = 1000/60;

var bam = document.getElementById("bam");
var alien = document.getElementById("alien");
var blank = document.getElementById("blank")

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//name   x  y    w  h    color    hp    layer
var player = new GameObject(100, canvas.height/2, 50, 50, "red", 100);

var enemy1 = new GameObject(canvas.width - 300, canvas.height/2, 100, 100, "green", 100, 1);
var enemy1rad = new GameObject(enemy1.x, enemy1.y, 550, 550, "yellow");

const enemies = [enemy1];

timer = setInterval(animate, interval);

function animate(){

    context.clearRect(0,0,canvas.width, canvas.height);

    if(w){player.y -= vy;}
    if(s){player.y += vy;}
    if(a){player.x -= vx;}
    if(d){player.x += vx;}

    //enemy detection radius
    enemy1rad.drawRect();

    if(click){
        if(canShoot == true){
        var result = fireRaycast({x : player.x, y : player.y},{xMouse: mouseX, yMouse: mouseY}, shoot_dist, enemies);

            if(result.hit){
                if(result.enemy.layer == 1)
                {
                result.enemy.hp = result.enemy.hp - damage;
            }
        }

        canShoot = false;
        setTimeout(function () {canShoot = true}, shoot_cooldown);
        }   

    }

    playerBounds(player);

    chasePlayer(enemy1rad, enemy1);

    context.font = "20px Arial";
    context.fillText(enemy1.hp, enemy1.x, enemy1.y - 50);
    context.fillText(player.hp, player.x, player.y - 75);

    enemy1.drawEnemy();
    player.drawPlayer();
}


