const PLAYER_SPEED = 5;
const ENEMY_SPEED = 5.25;

const GRAVEYARD = 5000;

var vx = PLAYER_SPEED;
var vy = PLAYER_SPEED;

var enemy_damage = 1;

var showHitboxes = true;
var canShoot = true;

var pistol = true;
var shotgun = false;
var sniper = false;
var smg = false;

var damage = 0;
var shoot_dist = 0;
var shoot_cooldown = 0;

if(pistol == true){
    damage = 25;
    shoot_dist = 400;
    shoot_cooldown = 1000;
}

else if(shotgun == true){
    damage = 50;
    shoot_dist = 200;
    shoot_cooldown = 1000;
}

else if(sniper == true){
    damage = 99;
    shoot_dist = 1000;
    shoot_cooldown = 2000;
}

else if(smg == true){
    damage = 5;
    shoot_dist = 400;
    shoot_cooldown = 100;
}

