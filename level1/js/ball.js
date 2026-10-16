function Ball(){
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.width = 100;
    this.height = 100;
    this.vx = 0;
    this.vy = 0;
    this.color = "#ff0000";
    this.radius = 50;
    
    this.draw = function(){
        context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 360*Math.PI/180, true);
            context.closePath();
        context.fill();
    }

    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;
    }
}