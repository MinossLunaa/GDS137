//player / wall collisions
function wallBorder(player){
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

//player / ball collisions
function paddleHit(player, obj){
    if(obj.collide(player)){
        if(obj.y < player.y - 17){
            obj.vy = -7;
            console.log("top hit");
        }
        else if(obj.y > player.y + 17){
            obj.vy = 7;
            console.log("bottom hit");
        }
        else{
            obj.vy = 0;
            console.log("mid hit");
        }
        obj.vx = -obj.vx;
    }
}

//ball / wall collisions
function ballBounce(obj){
    if(obj.x < obj.width / 2){
        obj.x = canvas.width/2;
        obj.y = canvas.height/2;
        obj.vy = 0;
    }
    if(obj.x > canvas.width - obj.width / 2){
        obj.x = canvas.width/2;
        obj.y = canvas.height/2;
        obj.vy = 0;
    }
    if(obj.y > canvas.height - obj.height / 2){
        obj.vy = -obj.vy;
    }
    if(obj.y < obj.height / 2){
        obj.vy *= -1;
    }
}