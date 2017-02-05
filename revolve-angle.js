angleMode = "degrees";

var printInfo = function(object) {
    var prec = 3;
    var x = object.x.toFixed(prec);
    var y = object.y.toFixed(prec);
    var vx = object.velX.toFixed(prec);
    var vy = object.velY.toFixed(prec);
    var angle = object.angle.toFixed(prec);
    
    println('x = ' + x + ' velX = ' + vx + ' cos(' + angle + ') = ' + cos(angle).toFixed(prec));
    println('y = ' + y + ' velY = ' + vy + ' sin(' + angle + ') = ' + sin(angle).toFixed(prec));
};

var displayInfo = function(object) {
    var prec = 3;
    var x = object.x.toFixed(prec);
    var y = object.y.toFixed(prec);
    var vx = object.velX.toFixed(prec);
    var vy = object.velY.toFixed(prec);
    var angle = object.angle.toFixed(prec);
    
    fill(0);
    textAlign(CENTER);
    text('x = ' + x + ' y = ' + y, 200, 200);
    text('velx = ' + vx + ' vely = ' + vy, 200, 220);
    text('theta = ' + angle, 200, 240);
    text(' sin = ' + sin(angle).toFixed(prec) +
         ' cos = ' + cos(angle).toFixed(prec), 200, 260);
    text('Radial distance = ' + object.radDist.toFixed(prec), 200, 280);
};

var Ball = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.radDist = dist(this.x, this.y, 0, 0);
    this.speed = 5;
    this.angle = atan2(this.y, this.x);
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
    
    this.velX = this.speed*cos(this.angle + 90);
    this.velY = this.speed*sin(this.angle + 90);
    
    this.angle = atan2(this.y, this.x);
    this.radDist = dist(this.x, this.y, 0, 0);
};

var ball = new Ball(200, 0, 20);

draw = function() {
    background(255);
    ball.draw();
    ball.update();
    displayInfo(ball);
};

keyPressed = function() {
    if (key.toString() === ' ') {
        printInfo(ball);
    }
};
