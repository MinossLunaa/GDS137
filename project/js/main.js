var canvas;
var context;
var timer;
var interval = 1000/60;

const GRAVEYARD = 5000;
var showHitboxes = true;

var playerHp = 100;
var healthColor = "white";
var playerModel = bam_pistol;
var playerSpeed = 5;
var vx = playerSpeed;
var vy = playerSpeed;

var ammo = 10;
var ammoUsage = 1;

var enemySpeed = 5.25;
var enemyDamage = 1;

var pistol = true;
var shotgun = false;
var sniper = false;
var smg = false;

var canShoot = true;
var damage = 0;
var shootDist = 0;
var shootCooldown = 0;

//const flashlight = document.getElementById("flashlight");

//images==============================================================
var alien = document.getElementById("alien");
var blank = document.getElementById("blank");
var shooting = document.getElementById("shooting");

var bam_pistol = document.getElementById("bam_pistol");
var bam_shotgun = document.getElementById("bam_shotgun");
var bam_smg = document.getElementById("bam_smg");
var bam_sniper = document.getElementById("bam_sniper");

var hp_image = document.getElementById("heart");
var ammo_image = document.getElementById("bullet");

//=====================================================================
var states = [];

states["mainMenu"] = function(){
     
}

states["game"] = function(){

    context.clearRect(0,0,canvas.width, canvas.height);

    var startingX = 100;
    var startingY = canvas.height / 2;

//guns ===============================================
if(pistol == true){
    damage = 25;
    shootDist = 200;
    shootCooldown = 1000;
    playerModel = bam_pistol;
    ammoUsage = 1;
}

if(shotgun == true){
    damage = 50;
    shootDist = 100;
    shootCooldown = 1000;
    playerModel = bam_shotgun;
    ammoUsage = 2;
}

if(smg == true){
    damage = 5;
    shootDist = 200;
    shootCooldown = 100;
    playerModel = bam_smg;
    ammoUsage = 0.25;
}

if(sniper == true){
    damage = 99;
    shootDist = 500;
    shootCooldown = 2000;
    playerModel = bam_sniper;
    ammoUsage = 1;
}
// ====================================================

    if(w){player.y -= vy;}
    if(s){player.y += vy;}
    if(a){player.x -= vx;}
    if(d){player.x += vx;}
   
    //enemy detection radius
    enemy1rad.drawRect();

    //shooting
    if(click){
        if(canShoot == true && ammo > 0){
        var result = fireRaycast({x : player.x, y : player.y},{xMouse: mouseX, yMouse: mouseY}, shootDist, targets);
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

    if(player.collide(shop)){
        currentState = "shop";
        player.x = startingX;
        player.y = startingY;
    }

    wallBounds(player, wall1);
    wallBounds(enemy1, wall1);

    chasePlayer(enemy1rad, enemy1);

    //enemy hp
    context.font = "20px Arial";
    context.fillText(enemy1.hp, enemy1.x, enemy1.y - 50);

    shop.drawRect();
    
    wall1.drawRect();

    enemy1.drawEnemy();

    player.drawPlayer();


    context.font = "20px Arial";
    context.fillStyle = healthColor; 
    context.drawImage(hp_image, (canvas.width / 2 - 500), canvas.height - 80, 75, 75);
    context.fillText(player.hp, (canvas.width / 2 - 480), canvas.height - 30);  
    context.fillStyle = "black"; 
    context.drawImage(ammo_image, (canvas.width / 2 - 435), canvas.height - 90, 90, 90);
    context.fillText(ammo, (canvas.width / 2 - 405), canvas.height - 30); 

    context.fillText("shop", shop.x - 25, shop.y)
}

states["shop"] = function(){
context.clearRect(0,0,canvas.width, canvas.height);

    //name   x  y    w  h    color    hp    layer
 var icon1 = new GameObject(200, 200, 100, 100, "blue");
 var icon2 = new GameObject(400, 200, 100, 100, "blue");
 var icon3 = new GameObject(600, 200, 100, 100, "blue");
 var icon4 = new GameObject(800, 200, 100, 100, "blue");
 var exitIcon = new GameObject(800, 400, 50, 50, "red");

 if(exitIcon.ContainsPoint(mouseX, mouseY)){
    if(click){
        //prevents firing when clicking exit
        canShoot = false;
        setTimeout(function () {canShoot = true}, 500);

        currentState = "game";
    }
 }

 if(icon1.ContainsPoint(mouseX, mouseY)){
    if(click){
        icon1.color = "yellow";

        pistol = true;
        shotgun = false;
        smg = false;
        sniper = false;
        console.log("pistol");
    }
 }

 if(icon2.ContainsPoint(mouseX, mouseY)){
    if(click){
        icon2.color = "yellow";

        pistol = false;
        shotgun = true;
        smg = false;
        sniper = false;
        console.log("shotgun");
    }
 }

 if(icon3.ContainsPoint(mouseX, mouseY)){
    if(click){
        icon3.color = "yellow";

        pistol = false;
        shotgun = false;
        smg = true;
        sniper = false;
        console.log("smg");
    }
 }

 if(icon4.ContainsPoint(mouseX, mouseY)){
    if(click){
        icon4.color = "yellow";

        pistol = false;
        shotgun = false;
        smg = false;
        sniper = true;
        console.log("sniper");
    }
 }

 
 icon1.drawRect();
 icon2.drawRect();
 icon3.drawRect();
 icon4.drawRect();
 exitIcon.drawRect();

context.font = "20px Arial";
context.fillText("pistol", icon1.x - 25, icon1.y); 
context.fillText("shotgun", icon2.x - 25, icon2.y); 
context.fillText("smg", icon3.x - 25, icon3.y); 
context.fillText("sniper", icon4.x - 25, icon4.y); 
context.fillText("exit", exitIcon.x - 25, exitIcon.y); 
}

states["endGame"] = function(){

}
var currentState = "game";

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//name   x  y    w  h    color    hp    layer
var player = new GameObject(100, canvas.height/2, 25, 25, "red", playerHp);

var enemy1 = new GameObject(canvas.width - 300, canvas.height/2, 75, 75, "green", 100, 1);
var enemy1rad = new GameObject(enemy1.x, enemy1.y, 375, 375, "yellow");

var wall1 = new GameObject(canvas.width / 2, canvas.height /2, 30, 400, "black", 0, 2);

const targets = [wall1, /*break*/ enemy1];

var shop = new GameObject(100, 100, 75, 75, "magenta");



timer = setInterval(animate, interval);

function animate(){
states[currentState]();
}

function changeStates(stateName)
{
	currentState = stateName;
}