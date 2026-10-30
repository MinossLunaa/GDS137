function playerBounds(player){
    if(player.x > canvas.width - player.width / 2 ||
       player.x < player.width / 2 ||
       player.y > canvas.height - player.height / 2 ||
       player.y < player.height / 2)
    {
        player.x = player.prevX;
        player.y = player.prevY;
    } else
    {
        player.prevX = player.x;
        player.prevY = player.y;
    }
}

function wallHit(player, wall){
    if(player.collide(wall)){
        player.x = player.prevX;
        player.y = player.prevY;
    }else{
        player.prevX = player.x;
        player.prevY = player.y;
    }
}

function fireRaycast(origin, mousePosition, maxDist, obstacles)
 {
    var directionX = mousePosition.xMouse - origin.x;
    var directionY = mousePosition.yMouse - origin.y;

    //normalize the vector (so its between 0-1)
    const distToMouse = Math.sqrt(directionX * directionX + directionY * directionY)

    if(distToMouse == 0)
    {
        directionX /= distToMouse;
        directionY /= distToMouse
    }

    directionX = directionX/distToMouse;
    directionY = directionY/distToMouse;

    var endPoint = {
        x: origin.x + directionX * maxDist,
        y: origin.y + directionY * maxDist
    }

    if(showHitboxes == true){
    context.strokeStyle = "magenta"
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(origin.x, origin.y)
    context.lineTo(endPoint.x, endPoint.y)
    context.stroke()
    }

  const step = .01; // resolution
  for (let t = 0; t <= maxDist; t += step) {

    const point = {
      x: origin.x + directionX * t,
      y: origin.y + directionY * t
    };

    if(obstacles.some(obs => obs.ContainsPoint(point.x, point.y))) {
      //returns
        var enemy = obstacles.find(obs => obs.ContainsPoint(point.x, point.y))

      return { hit: true, enemy, distance: t };
    }
  }
  return { hit: false };
}

function chasePlayer(enemyrad, enemy){

    if(player.collide(enemyrad) || enemy.hp < 100){

        var dx = player.x - enemy.x;
        var dy = player.y - enemy.y;

        var distance = Math.sqrt(dx*dx + dy*dy)
        if(distance > 0)
        {
        enemy.x += (dx/distance) * ENEMY_SPEED;
        enemy.y += (dy/distance) * ENEMY_SPEED;

        enemyrad.x = enemy.x;
        enemyrad.y = enemy.y;
        }
    }

    if(player.collide(enemy)){
        player.hp -= enemy_damage;
    }

    if(enemy.hp <= 0){
        enemy.y = GRAVEYARD;
        dx = 0;
        dy = 0;
    }

}