function GameObject(x,y,w,h,color, hp, layer){

    if(x == undefined)
        this.x = canvas.width/2;
    else
        this.x = x;
    if(y == undefined)
        this.y = canvas.width/2;
    else
        this.y = y;

    if(w == undefined)
        this.width = 0;
    else
        this.width = w;
    if(h == undefined)
        this.height = 0;
    else
        this.height = h;

    if(color == undefined)
        this.color = "black";
    else
        this.color = color;

    if(hp == undefined)
        this.hp = 100;
    else
        this.hp = hp;

    if(layer == undefined){
        this.layer = 0;
    }
    else
        this.layer = layer;
    //Enemies layer = 1
    //Walls layer = 2

    this.drawPlayer = function(){
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x, this.y);
            context.rotate(mouseRotation);
            if(showHitboxes == true){
            context.fillRect((-this.width / 2), (-this.height / 2), this.width, this.height);
            }
            context.drawImage(bam, (-this.width / 2) - 30, (-this.height/2) - 30, this.width + 60, this.height + 60);
        context.restore();
    }

    this.drawLine = function(startingX, startingY, endingX, endingY){
        context.save();
            context.beginPath();
            context.moveTo(startingX, startingY);
            context.lineTo(endingX, endingY);
            context.closePath();
            context.stroke();
        context.restore();

    }

   this.drawRect = function(rotation){
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x,this.y);
            context.rotate(rotation);
            context.fillRect((-this.width / 2), (-this.height / 2), this.width, this.height);
        context.restore();
    }

    this.drawCircle = function(){
        context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.translate(this.x, this.y);
            context.arc(0, 0, this.width/2, 0, 360 *Math.PI/180, true);
            context.closePath();
            context.fill();
        context.restore();
    }

    this.move = function(){
        this.x -= this.vx;
        this.y += this.vy;
    }

    this.left = function(){
        return this.x - this.width/2;
    }
    this.right = function(){
        return this.x + this.width/2;
    }

    this.top = function(){
        return this.y - this.height/2;
    }
    this.bottom = function(){
        return this.y + this.height/2;
    }

    this.collide = function(obj){
        if(this.left() < obj.right() &&
           this.right() > obj.left() &&
           this.top() < obj.bottom() &&
           this.bottom() > obj.top()){
            return true;
           }
           return false;
    }

    this.ContainsPoint = function(x, y){
        if(x >= this.x - this.width/2 && x <= this.x + this.width/2 &&
            y >= this.y - this.height/2 && y <= this.y +this.height/2
        ){
         return true;
        }
        return false;
    }

}   