var w = false;
var a = false;
var s = false;
var d = false;
var mouseRotation;
var mouseRadian;


document.addEventListener("keydown", press);
document.addEventListener("keyup", release);
document.addEventListener("mousemove", mousemove);

function mousemove(e){
    var rect = document.getElementById("canvas").getBoundingClientRect();

    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    var dx = mouseX - player.x;
    var dy = mouseY - player.y;
    mouseRadian = Math.atan2 (dy, dx) * Math.PI / 3;
	mouseRotation = mouseRadian * 180/Math.PI;
}

function press(e)
{
	//---This logs key codes into the browser's console.
	console.log(e.keyCode);
	
	if(e.keyCode == 87)
	{
		w = true;
	}
	if(e.keyCode == 65)
	{
		a = true;
	}
	if(e.keyCode == 83)
	{
		s = true;
	}
	if(e.keyCode == 68)
	{
		d = true;
	}
}

function release(e)
{
	//---This logs key codes into the browser's console.
	//console.log(e.keyCode);
	
	if(e.keyCode == 87)
	{
		w = false;
	}
	if(e.keyCode == 65)
	{
		a = false;
	}
	if(e.keyCode == 83)
	{
		s = false;
	}
	if(e.keyCode == 68)
	{
		d = false;
	}
}
