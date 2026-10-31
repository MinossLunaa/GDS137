var canvas;
var context;
var timer;
var interval = 1000/60;

var floor = document.getElementById("floor");
var alien = document.getElementById("alien");
var blank = document.getElementById("blank");

var bam_pistol = document.getElementById("bam_pistol");
var bam_shotgun = document.getElementById("bam_shotgun");
var bam_smg = document.getElementById("bam_smg");
var bam_sniper = document.getElementById("bam_sniper");

var hp_image = document.getElementById("heart");
var ammo_image = document.getElementById("bullet");

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

var playerHp = 100;
var healthColor = "white";

//name   x  y    w  h    color    hp    layer
var player = new GameObject(100, canvas.height/2, 50, 50, "red", playerHp);

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
        if(canShoot == true && ammo > 0){
        var result = fireRaycast({x : player.x, y : player.y},{xMouse: mouseX, yMouse: mouseY}, shootDist, enemies);
            if(result.hit){
                if(result.enemy.layer == 1)
                {
                result.enemy.hp = result.enemy.hp - damage;
            }
        }

        ammo -= ammoUsage;
        canShoot = false;
        setTimeout(function () {canShoot = true}, shootCooldown);
        }   

    }

    playerBounds(player);

    chasePlayer(enemy1rad, enemy1);

    context.font = "20px Arial";
    context.fillText(enemy1.hp, enemy1.x, enemy1.y - 50);
    
    enemy1.drawEnemy();
    player.drawPlayer();

    context.fillStyle = healthColor; 
    context.drawImage(hp_image, (canvas.width / 2 - 500), canvas.height - 80, 75, 75);
    context.fillText(player.hp, (canvas.width / 2 - 480), canvas.height - 30);  
    context.fillStyle = "black"; 
    context.drawImage(ammo_image, (canvas.width / 2 - 435), canvas.height - 90, 90, 90);
    context.fillText(ammo, (canvas.width / 2 - 405), canvas.height - 30); 
}


