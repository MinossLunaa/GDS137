var canvas;
var context;
var timer;
var interval = 1000/60;

var bam = document.getElementById("bam");

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//name   x  y    w  h    color    hp    layer
var player = new GameObject(300, canvas.height/2, 50, 50, "red", 100);
var enemy1 = new GameObject(canvas.width - 300, canvas.height/2, 50, 50, "green", 100, 1);
var enemy1rad = new GameObject(enemy1.x, enemy1.y, 500, 500, "yellow");

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
                if(result.enemy.hp <= 0){
                    result.enemy.y = GRAVEYARD;
                }
            }
        }

        canShoot = false;
        setTimeout(function () {canShoot = true}, shoot_cooldown);
        }   

    }

    wallBorder(player);
    chasePlayer(enemy1rad, enemy1);

    context.font = "20px Arial";
    context.fillText(enemy1.hp, enemy1.x, enemy1.y - 45);
    context.fillText(player.hp, player.x, player.y - 70);

    enemy1.drawRect();
    player.drawPlayer();
}


