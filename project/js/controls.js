var w = false;
var a = false;
var s = false;
var d = false;
var arrowUp = false;
var arrowLeft = false;
var arrowDown = false;
var arrowRight = false;
click = false;

var mouseX = 0;
var mouseY = 0;
var mouseRotation = 0;

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);
document.addEventListener("mousemove", mousemove);
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);

function mousedown(){
    click = true;
}
function mouseup(){
    click = false;
}
function mousemove(e){
    var rect = document.getElementById("canvas").getBoundingClientRect();

    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    var dx = mouseX - player.x;
    var dy = mouseY - player.y;
    mouseRotation = Math.atan2 (dy, dx) + Math.PI / 2;    
}

function press(e){
    //wasd
    if(e.keyCode == 87){
        w = true;
    }
    if(e.keyCode == 65){
        a = true;
    }
    if(e.keyCode == 83){
        s = true;
    }
    if(e.keyCode == 68){
        d = true;
    }
    
    //arrows
    if(e.keyCode == 38){
        arrowUp = true;
    }
    if(e.keyCode == 37){
        arrowLeft = true;
    }
    if(e.keyCode == 40){
        arrowDown = true;
    }
    if(e.keyCode == 39){
        arrowRight = true;
    }
}

function release(e){
    //wasd
    if(e.keyCode == 87){
        w = false;
    }
    if(e.keyCode == 65){
        a = false;
    }
    if(e.keyCode == 83){
        s = false;
    }
    if(e.keyCode == 68){
        d = false;
    }

    //arrows
    if(e.keyCode == 38){
        arrowUp = false;
    }
    if(e.keyCode == 37){
        arrowLeft = false;
    }
    if(e.keyCode == 40){
        arrowDown = false;
    }
    if(e.keyCode == 39){
        arrowRight = false;
    }
}


