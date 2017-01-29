var keys = [];
keyPressed = function() {
    keys[keyCode] = true;
};
keyReleased = function() {
    keys[keyCode] = false;
};
var distance = function(obj1, obj2) {
    return dist(obj1.x, obj1.y, obj2.x, obj2.y);
};

var Ball = function(x, y, radius, colors) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colors = colors;
    this.speed = 5;
    this.velX = 0;
    this.velY = 0;
};
Ball.prototype.draw = function() {
    noStroke();
    fill(this.colors[0], this.colors[1], this.colors[2]);
    ellipse(this.x, this.y, 2*this.radius, 2*this.radius);
};

var ControlledBall = function(x, y, radius, colors) {
    Ball.call(this, x, y, radius, colors);
};
ControlledBall.prototype = Object.create(Ball.prototype);
ControlledBall.prototype.update = function() {
    this.velX = 0;
    this.velY = 0;
    
    if (keys[UP]) {this.velY = -this.speed;}
    if (keys[DOWN]) {this.velY = this.speed;}
    if (keys[RIGHT]) {this.velX = this.speed;}
    if (keys[LEFT]) {this.velX = -this.speed;}
    
    this.x += this.velX;
    this.y += this.velY;
};

var TestBall = function(x, y, radius, colors, defaultVelX, defaultVelY) {
    Ball.call(this, x, y, radius, colors);
    this.sRadius = 3*this.radius;  //sensing radius
    this.defaultVelX = defaultVelX;
    this.defaultVelY = defaultVelY;
    this.distance = 0;
    
    //override parent class's velocities
    this.velX = this.defaultVelX;
    this.velY = this.defaultVelY;
};
TestBall.prototype = Object.create(Ball.prototype);
TestBall.prototype.update = function() {
    this.x += this.velX;
    this.y += this.velY;
    
    //set velocities as linear functions of distance
    if (this.distance < this.sRadius) {
        this.velX = (this.defaultVelX/this.sRadius) * this.distance;
        this.velY = (this.defaultVelY/this.sRadius) * this.distance;
    } else {
        this.velX = this.defaultVelX;
        this.velY = this.defaultVelY;
    }
};
TestBall.prototype.setDistance = function(that) {
    this.distance = distance(this, that) - (this.radius + that.radius);
};

var control = new ControlledBall(200, 200, 20, [200, 0, 0]);
var test = new TestBall(50, 200, 20, [0, 200, 0], 5, 0);

draw = function() {
    background(255);
    control.draw();
    test.draw();
    control.update();
    test.update();
    test.setDistance(control);
};
