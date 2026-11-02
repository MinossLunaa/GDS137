var w = false;
var a = false;
var s = false;
var d = false;
var arrowUp = false;
var arrowLeft = false;
var arrowDown = false;
var arrowRight = false;

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

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

