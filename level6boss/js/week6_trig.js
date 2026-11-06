//--------------------Goal - To find an angle and rotate a turret to that angle--------------------------
//--------------------Description - Make the blue turret aim at the player even if the player moves.
//--------------------Don't touch the walls.------------------------------------------------------------------
//--------------------Read the commented instructions below to complete this assignment----------------------
//--------------------Upload your completed file to the ict server and submit a link-------------------------

var canvas;
var context;
var timer;
var interval;
var player;
var friction = 0.95;
var vx = 0;
var gravity = 0;
var prevX = 0;
var prevY = 0;
var score = 0;

var isGreen = false;
var isRed = false;
var reset = false;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject({x: canvas.width/2, y: canvas.height - 50, width: 50, height: 50, color:"#ffff00"});
	player.force = 1;
	
	var hazard1 = new GameObject({x:200, y:-10, width:25, color:"red"});
	var hazard2 = new GameObject({x:300, y:-40, width:25, color:"red"});
	var hazard3 = new GameObject({x:400, y:-30, width:25, color:"red"});
	var hazard4 = new GameObject({x:500, y:-15, width:25, color:"red"});
	var hazard5 = new GameObject({x:600, y:-10, width:25, color:"red"});
	var hazards = [hazard1, hazard2, hazard3, hazard4, hazard5];

	var item1 = new GameObject({x:200, y:-90, width:25, height:25, color:"lime"});
	var item2 = new GameObject({x:300, y:-25, width:25, height:25, color:"lime"});
	var item3 = new GameObject({x:400, y:-20, width:25, height:25, color:"lime"});
	var item4 = new GameObject({x:500, y:-55, width:25, height:25, color:"lime"});
	var item5 = new GameObject({x:600, y:-78, width:25, height:25, color:"lime"});
	var items = [item1, item2, item3, item4, item5];
	
	var canvasTrigger = new GameObject({x:canvas.width/2, y:canvas.height + 100, width:canvas.width, height:50});

	interval = 1000/60;
	timer = setInterval(animate, interval);

//starting locations and speeds
for(var i = 0; i < 5; i++){
	hazards[i].y = Math.random() * (-10 - -500) - 500;
	hazards[i].x = Math.random() * (790 - 10) + 10;
	hazards[i].vy = Math.random() * (7 - 3) + 3;

	items[i].y = Math.random() * (-10 - -500) - 500;
	items[i].x = Math.random() * (790 - 10) + 10;
	items[i].vy = Math.random() * (7 - 3) + 3;
}

var states = [];
var currentState = "game";

states["game"] = function(){
     context.clearRect(0,0,canvas.width, canvas.height);
	if(isGreen == true){
		player.color = "lime";
	}
	else if(isRed == true){
		player.color = "red";
	}
	else{
		player.color = "#ffff00";
	}

	if(a){
        vx -= 0.25;
    }
    if(d){
        vx += 0.25;
    }
    vx *= friction;
    player.x += vx;
	player.horizontalMove();

	for(var i = 0; i < 5; i++){
		hazards[i].verticalMove();
		items[i].verticalMove();
	}

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

	//recycle and check player hit
	for(var i = 0; i < 5; i++){
	if(hazards[i].hitTestObject(canvasTrigger)){
		hazards[i].y = Math.random() * (-10 - -500) - 500;
		hazards[i].x = Math.random() * (790 - 10) + 10;
		hazards[i].vy = Math.random() * (7 - 3) + 3;
	}
	if(hazards[i].hitTestObject(player)){
		isRed = true;
		setTimeout(function () {isRed = false}, 500);
		score = 0;
		reset = true;
	}
	if(items[i].hitTestObject(canvasTrigger)){
		items[i].y = Math.random() * (-10 - -500) - 500;
		items[i].x = Math.random() * (790 - 10) + 10;
		items[i].vy = Math.random() * (7 - 3) + 3;
	}
	if(items[i].hitTestObject(player)){
		isGreen = true;
		items[i].y = Math.random() * (-10 - -500) - 500;
		items[i].x = Math.random() * (790 - 10) + 10;
		setTimeout(function () {isGreen = false}, 500);
		score++;
	}

	}

	if(reset == true){
		for(var i = 0; i < 5; i++){
		hazards[i].y = Math.random() * (-10 - -500) - 500;
		hazards[i].x = Math.random() * (790 - 10) + 10;
		hazards[i].vy = Math.random() * (7 - 3) + 3;

		items[i].y = Math.random() * (-10 - -500) - 500;
		items[i].x = Math.random() * (790 - 10) + 10;
		items[i].vy = Math.random() * (7 - 3) + 3;
		}
		reset = false;
	}


	player.drawRect();

	for(var i = 0; i < 5; i++){
	hazards[i].drawCircle();
	items[i].drawRect();
	}
	
	canvasTrigger.drawRect();

	
	context.font = "30px Arial";
    context.fillText("Score: " + score, 40, 50);
}

function animate()
{
	states[currentState]();
}

function changeStates(stateName)
{
	currentState = stateName;
}

	
	

