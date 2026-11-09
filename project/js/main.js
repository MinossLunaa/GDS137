var canvas;
var context;
var timer;
var interval = 1000/60;

const GRAVEYARD = 5000;
var showHitboxes = true;

//upgrades
var hpMult = 0;
var damageMult = 1;
var speedMult = 1;
var vampiric = false;
var vammopiric = false;

var score = 1000;
var healthColor = "white";
var playerModel = bam_pistol;

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
var money_image = document.getElementById("money");

//sounds================================================================


canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//name   x  y    w  h    color    hp    layer
var player = new GameObject(100, canvas.height/2, 25, 25, "red", 100);

var enemy1 = new GameObject(700, 375, 75, 75, "green", 100, 1);
var enemy1rad = new GameObject(enemy1.x, enemy1.y, 375, 375, "yellow");
var enemy1money = new GameObject(enemy1.x, enemy1.y, 25, 25, "lime");

var wall1 = new GameObject(canvas.width / 2, canvas.height /2, 30, 400, "black", 0, 2);

const targets = [wall1, /*break*/ enemy1];

var shop = new GameObject(100, 100, 75, 75, "magenta");

timer = setInterval(animate, interval);

var states = [];
var currentState = "shop";

states["mainMenu"] = function(){
     
}

states["game"] = function(){
    var vx = 5 * speedMult;
    var vy = 5 * speedMult;

    shop_song.pause();
    game_song.play();
    context.clearRect(0,0,canvas.width, canvas.height);

    var startingX = 100;
    var startingY = canvas.height / 2;

//guns ===============================================
if(pistol == true){
    damage = 25 * damageMult;
    shootDist = 200;
    shootCooldown = 1000;
    playerModel = bam_pistol;
    ammoUsage = 1;
}

if(shotgun == true){
    damage = 50 * damageMult;
    shootDist = 100;
    shootCooldown = 100;
    playerModel = bam_shotgun;
    ammoUsage = 2;
}

if(smg == true){
    damage = 5 * damageMult;
    shootDist = 200;
    shootCooldown = 100;
    playerModel = bam_smg;
    ammoUsage = 0.25;
}

if(sniper == true){
    damage = 99 * damageMult;
    shootDist = 500;
    shootCooldown = 2500;
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
                hit_sound.currentTime = 0;
                hit_sound.play();
            }
        }
        ammo -= ammoUsage;
        canShoot = false;
        setTimeout(function () {canShoot = true}, shootCooldown);

            if(pistol == true){
                pistol_sound.currentTime = 0;
                pistol_sound.play();
            }
            if(shotgun == true){
                shotgun_sound.currentTime = 0;
                shotgun_sound.play();
            }
            if(sniper == true){
                sniper_sound.currentTime = 0;
                sniper_sound.play();
            }
            if(smg == true){
                smg_sound.currentTime = 0;
                smg_sound.play();
            }
        }   
    }

    if(player.collide(shop)){
        currentState = "shop";
        player.x = startingX;
        player.y = startingY;
    }
    
    wallBounds(player, wall1);
    wallBounds(enemy1, wall1);

    chasePlayer(enemy1rad, enemy1, enemy1money);

    //enemy hp
    context.font = "20px Arial";
    context.fillText(enemy1.hp, enemy1.x, enemy1.y - 50);

    shop.drawRect();
    
    wall1.drawRect();

    enemy1money.drawRect();
    enemy1.drawEnemy();
    
    player.drawPlayer();

    context.font = "20px Arial";
    context.fillStyle = healthColor; 
    context.drawImage(hp_image, (canvas.width / 2 - 500), canvas.height - 80, 75, 75);
    context.fillText(player.hp, (canvas.width / 2 - 480), canvas.height - 30);  
    context.fillStyle = "black"; 
    context.drawImage(ammo_image, (canvas.width / 2 - 435), canvas.height - 90, 90, 90);
    context.fillText(ammo, (canvas.width / 2 - 405), canvas.height - 30); 
    context.drawImage(money_image, (canvas.width / 2 - 350), canvas.height - 65, 60, 60);
    context.fillText(score, (canvas.width / 2 - 340), canvas.height - 30); 

    context.fillText("shop", shop.x - 25, shop.y);
}

states["shop"] = function(){

game_song.pause();
shop_song.play();
shop_song.volume = 0.25;
context.clearRect(0,0,canvas.width, canvas.height);

//images ===========================================================
// var shop_img = document.getElementById("shop_img");
// var shop_pistol = document.getElementById("shop_pistol");
// var shop_pistol_hover = document.getElementById("shop_pistol_hover");
// var shop_shotgun = document.getElementById("shop_shotgun");
// var shop_shotgun_hover = document.getElementById("shop_shotgun_hover");
// var shop_sniper = document.getElementById("shop_sniper");
// var shop_sniper_hover = document.getElementById("shop_sniper_hover");
// var shop_smg = document.getElementById("shop_smg");
// var shop_smg_hover = document.getElementById("shop_smg_hover");
// var shop_max_hp = document.getElementById("shop_max_hp");
// var shop_max_hp_hover = document.getElementById("shop_max_hp_hover");
// var shop_damage = document.getElementById("shop_damage");
// var shop_damage_hover = document.getElementById("shop_damage_hover");
// var shop_hermes_boots = document.getElementById("shop_hermes_boots");
// var shop_hermes_boots_hover = document.getElementById("shop_hermes_boots_hover");
// var shop_vampiric = document.getElementById("shop_vampiric");
// var shop_vampiric_hover = document.getElementById("shop_vampiric_hover");
// var shop_vammopiric = document.getElementById("shop_vammopiric");
// var shop_vammopiric_hover = document.getElementById("shop_vammopiric_hover");
// var shop_exit = document.getElementById("shop_exit");
// var shop_exit_hover = document.getElementById("shop_exit_hover");
//==================================================================

context.drawImage(shop_img, (canvas.width / 2) - 500, (canvas.height / 2) - 375, 1000, 750);

    //name   x  y    w  h    color    hp    layer
 var exitIcon = new GameObject(890, 600, 175, 175, "red");

 var icon1 = new GameObject(125, 100, 200, 200, "blue");
 var icon2 = new GameObject(410, 100, 200, 200, "blue");
 var icon3 = new GameObject(790, 100, 400, 200, "blue");

 var icon4 = new GameObject(125, 350, 200, 200, "blue");
 var icon5 = new GameObject(365, 350, 200, 200, "blue");
 var icon6 = new GameObject(620, 350, 200, 200, "blue");

 var icon7 = new GameObject(125, 575, 200, 200, "blue");
 var icon8 = new GameObject(365, 575, 200, 200, "blue");
 var icon9 = new GameObject(600, 575, 200, 200, "blue");

 var icons = [exitIcon, icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9];

//  if(showHitboxes == true){
//     for(var i = 0; i < 10; i++){
//         icons[i].drawRect();
//     }
//  }

 context.drawImage(shop_pistol, (icon1.x / 2) - 35, (icon1.y / 2) - 55, 269, 223);
 context.drawImage(shop_shotgun, (icon2.x - 120), (icon2.y / 2) - 40, 269, 223);
 context.drawImage(shop_sniper, (icon3.x - 200), (icon3.y / 2) - 40, 423, 207);

 context.drawImage(shop_smg, (icon4.x - 125), (icon4.y - 50) - 40, 297, 211);
 context.drawImage(shop_max_hp, (icon5.x - 100), (icon5.y - 50) - 40, 243, 219);
 context.drawImage(shop_damage, (icon6.x - 85), (icon6.y - 50) - 40, 215, 205);

 context.drawImage(shop_hermes_boots, (icon7.x - 115), (icon7.y - 60) - 40, 265, 253);
 context.drawImage(shop_vampiric, (icon8.x - 100), (icon8.y - 50) - 40, 243, 219);
 context.drawImage(shop_vammopiric, (icon9.x - 75), (icon9.y - 50) - 40, 229, 205);
 
 context.drawImage(money, (exitIcon.x - 100), (exitIcon.y - 225) - 40, 205, 159);
 context.drawImage(shop_exit, (exitIcon.x - 100), (exitIcon.y - 50) - 40, 205, 159);

 context.font = "40px Arial";
 context.fillText(score, exitIcon.x - 35, exitIcon.y - 175);

 if(exitIcon.ContainsPoint(mouseX, mouseY)){
    context.drawImage(shop_exit_hover, (exitIcon.x - 100), (exitIcon.y - 50) - 40, 205, 159);

    if(click){
        //prevents firing when clicking exit
        canShoot = false;
        setTimeout(function () {canShoot = true}, 500);
        currentState = "game";
    }
 }

 if(icon1.ContainsPoint(mouseX, mouseY)){
    context.drawImage(shop_pistol_hover, (icon1.x / 2) - 35, (icon1.y / 2) - 55, 269, 223);

    if(click){
        pistol = true;
        shotgun = false;
        smg = false;
        sniper = false;

        console.log("pistol");
        icon1.color = "yellow";
        click = false;

        buy_sound.currentTime = 0;
        buy_sound.play();
    }
 }

 if(icon2.ContainsPoint(mouseX, mouseY)){
    context.drawImage(shop_shotgun_hover, (icon2.x - 120), (icon2.y / 2) - 40, 269, 223);

    if(click){
        if(score >= 60){
            pistol = false;
            shotgun = true;
            smg = false;
            sniper = false;
           
            console.log("shotgun");
            icon2.color = "yellow";
            score -= 60;
            click = false;
            buy_sound.currentTime = 0;
            buy_sound.play();
        }
        else{
            cant_buy_sound.currentTime = 0;
            cant_buy_sound.play();
        }
    }
 }

 if(icon3.ContainsPoint(mouseX, mouseY)){
    context.drawImage(shop_sniper_hover, (icon3.x - 200), (icon3.y / 2) - 40, 423, 207);

    if(click){
        if(score >= 80){
            pistol = false;
            shotgun = false;
            smg = false;
            sniper = true;

            console.log("sniper");
            icon3.color = "yellow";
            score -= 80;
            click = false;
            buy_sound.currentTime = 0;
            buy_sound.play();
        }
        else{
            cant_buy_sound.currentTime = 0;
            cant_buy_sound.play();
        }
    }
 }

 if(icon4.ContainsPoint(mouseX, mouseY)){
    context.drawImage(shop_smg_hover, (icon4.x - 125), (icon4.y - 50) - 40, 297, 211);

    if(click){
        if(score >= 50){
            pistol = false;
            shotgun = false;
            smg = true;
            sniper = false;

            console.log("smg");
            icon4.color = "yellow";
            score -= 50;
            click = false;
            buy_sound.currentTime = 0;
            buy_sound.play();
        }
        else{
            cant_buy_sound.currentTime = 0;
            cant_buy_sound.play();
        }
    }
 }

  if(icon5.ContainsPoint(mouseX, mouseY)){
    context.drawImage(shop_max_hp_hover, (icon5.x - 100), (icon5.y - 50) - 40, 243, 219);

    if(click){
        if(score >= 40){
            hpMult = 100;
            player.hp += hpMult;

            console.log("max hp + 100");
            icon5.color = "yellow";
            score -= 40;
            click = false;
            buy_sound.currentTime = 0;
            buy_sound.play();
        }
        else{
            cant_buy_sound.currentTime = 0;
            cant_buy_sound.play();
        }
    }
 }

 if(icon6.ContainsPoint(mouseX, mouseY)){
    context.drawImage(shop_damage_hover, (icon6.x - 85), (icon6.y - 50) - 40, 215, 205);

    if(click){
        if(score >= 40){
            damageMult = 1.5;
            
            console.log("damage + 50%");
            icon6.color = "yellow";
            score -= 40;
            click = false;
            buy_sound.currentTime = 0;
            buy_sound.play();
        }
        else{
            cant_buy_sound.currentTime = 0;
            cant_buy_sound.play();
        }
    }
 }

 if(icon7.ContainsPoint(mouseX, mouseY)){
    context.drawImage(shop_hermes_boots_hover, (icon7.x - 115), (icon7.y - 60) - 40, 265, 253);

    if(click){
        if(score >= 60){
            speedMult = 1.15;
            
            console.log("hermes boots");
            icon7.color = "yellow";
            score -= 60;
            click = false;
            buy_sound.currentTime = 0;
            buy_sound.play();
        }
        else{
            cant_buy_sound.currentTime = 0;
            cant_buy_sound.play();
        }
    }
 }

  if(icon8.ContainsPoint(mouseX, mouseY)){
    context.drawImage(shop_vampiric_hover, (icon8.x - 100), (icon8.y - 50) - 40, 243, 219);

    if(click){
        if(score >= 60){
            vampiric = true;
            
            console.log("vampiric");
            icon8.color = "yellow";
            score -= 60;
            click = false;
            buy_sound.currentTime = 0;
            buy_sound.play();
        }
        else{
            cant_buy_sound.currentTime = 0;
            cant_buy_sound.play();
        }
    }
 }

   if(icon9.ContainsPoint(mouseX, mouseY)){
    context.drawImage(shop_vammopiric_hover, (icon9.x - 75), (icon9.y - 50) - 40, 229, 205);

    if(click){
        if(score >= 20){
            vammopiric = true;
            
            console.log("vammopiric");
            icon9.color = "yellow";
            score -= 20;
            click = false;
            buy_sound.currentTime = 0;
            buy_sound.play();
        }
        else{
            cant_buy_sound.currentTime = 0;
            cant_buy_sound.play();
        }
    }
 }
}

states["endGame"] = function(){

}


function animate(){
states[currentState]();
}

function changeStates(stateName)
{
	currentState = stateName;
}
