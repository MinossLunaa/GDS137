//wall collisions
function wallBorder(obj){
    if(obj.x > canvas.width - obj.width / 2 ||
       obj.x < obj.width / 2 ||
       obj.y > canvas.height - obj.height / 2 ||
       obj.y < obj.height / 2)
    {
        obj.x = obj.prevX;
        obj.y = obj.prevY;
    } else
    {
        obj.prevX = obj.x;
        obj.prevY = obj.y;
    }
}

//player / ball collisions
function paddleHit(player, obj){
    if(obj.collide(player)){
        if(obj.x < player.x - 83.34){
            console.log("1");
            obj.vx = -ballForce * 5;
        }
        else if(obj.x < player.x - 41.67 && obj.x > player.x - 83.34){
            console.log("2");
            obj.vx = -ballForce;
        }
        else if(obj.x < player.x + 41 && obj.x > player.x - 41){
            console.log("3");
        }
        else if(obj.x > player.x + 41.67 && obj.x < player.x + 83.34){
            console.log("4");
            obj.vx = ballForce;
        }
        else if(obj.x > player.x + 83.34){
            console.log("5");
            obj.vx = ballForce * 5;
        }

        obj.vy = -35;
        score++;
    }
    
}

//ball / wall collisions
function ballBounce(obj){
    //left
    if(obj.x < obj.width / 2){
        obj.vx *= -1;
    }
    //right
    if(obj.x > canvas.width - obj.width / 2){
        obj.vx = -obj.vx;
    }
    //top
    if(obj.y < obj.height / 2){
        obj.vy *= -1;
    }
    //bottom
    if(obj.y > canvas.height - obj.height / 2){
        obj.x = obj.prevX;
        obj.y = obj.prevY;
        obj.vy = -obj.vy * 0.67;
        score = 0;
    }
    else{
        obj.prevX = obj.x;
        obj.prevY = obj.y;
    }
    
}