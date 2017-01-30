var printInfo = function(object) {
    var prec = 3;
    var vx = object.velX.toFixed(prec);
    var vy = object.velY.toFixed(prec);
    var angle = object.angle.toFixed(prec);
    
    println('velX = ' + vx + ', cos(' + angle + ') = ' + cos(angle).toFixed(prec));
    println('velY = ' + vy + ', sin(' + angle + ') = ' + sin(angle).toFixed(prec));
};

var Ball = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 5;
    this.angle = 0;
    this.velX = 0;
    this.velY = 0;
};
Ball.prototype.draw = function() {
    noFill();
    stroke(0);
    ellipse(this.x, this.y, 2*this.radius, 2*this.radius);
};
Ball.prototype.update = function() {
    this.x += this.velX;
    this.y += this.velY;
    
    this.velX = this.speed*cos(this.angle);
    this.velY = this.speed*sin(this.angle);
    
    this.angle += 2;
};

var ball = new Ball(200, 100, 20);

draw = function() {
    background(255);
    ball.draw();
    ball.update();
};

keyPressed = function() {
    if (key.toString() === ' ') {
        printInfo(ball);
    }
};
