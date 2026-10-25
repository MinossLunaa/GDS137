function GameObject(x,y,w,h,color, rotation){

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

    if(rotation == undefined)
        this.rotation = 0;
    else{
        this.rotation = rotation;
    }

    this.drawPlayer = function(){
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x, this.y);
            context.rotate(mouseRotation);
            if(showHitboxes == true){
            context.fillRect((-this.width / 2), (-this.height / 2), this.width, this.height);
            }
            //context.drawImage(bam, -this.x / 4 + 20, -this.y / 4 + 34, this.width + 65, this.height + 65);
        context.restore();
    }

    // this.printImage = function(img, rotation){
    //     context.save();
    //         context.translate(this.x, this.y);
    //         context.rotate(rotation);
    //         context.drawImage(img, this.x, this.y, this.w, this.h);
    //     context.restore();
    // }

    this.drawLine = function(startingX, startingY, endingX, endingY){
        context.save();
            context.beginPath();
            context.moveTo(startingX, startingY);
            context.lineTo(endingX, endingY);
            context.closePath();
            context.stroke();
        context.restore();

    }

   this.drawRect = function(){
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x, this.y);
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
            return true
           }
           return false;
    }

}   