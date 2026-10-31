const GRAVEYARD = 5000;
var showHitboxes = true;

//playerHp in main
var playerModel = bam_pistol;
var playerSpeed = 5;
var vx = playerSpeed;
var vy = playerSpeed;

var ammo = 10;
var ammoUsage = 1;

var enemySpeed = 5.25;
var enemyDamage = 1;

var pistol = false;
var shotgun = false;
var sniper = false;
var smg = true;

var canShoot = true;
var damage = 0;
var shootDist = 0;
var shootCooldown = 0;

if(pistol == true){
    damage = 25;
    shootDist = 400;
    shootCooldown = 1000;
    playerModel = bam_pistol;
    ammoUsage = 1;
}

else if(shotgun == true){
    damage = 50;
    shootDist = 200;
    shootCooldown = 1000;
    playerModel = bam_shotgun;
    ammoUsage = 2;
}

else if(smg == true){
    damage = 5;
    shootDist = 400;
    shootCooldown = 100;
    playerModel = bam_smg;
    ammoUsage = 0.25;
}

else if(sniper == true){
    damage = 99;
    shootDist = 1000;
    shootCooldown = 2000;
    playerModel = bam_sniper;
    ammoUsage = 1;
}


