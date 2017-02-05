
var distance = function(obj1, obj2) {
    return dist(obj1.x, obj1.y, obj2.x, obj2.y);
};

/*** BALL ***/
var Ball = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
};
Ball.prototype.draw = function() {
    noFill();
    stroke(0);
    strokeWeight(1);
    ellipse(this.x, this.y, 2*this.radius, 2*this.radius);
};

/*** TEST BALL ***/
var TestBall = function(x, y, radius) {
    Ball.call(this, x, y, radius);
    this.sRadius = 3*this.radius;
    this.objNear = false;
    this.senseAccu = 15;
    
    var Point = function(x, y) {
        this.x = x;
        this.y = y;
        this.detecting = false;
    };
    Point.prototype.draw = function() {
        strokeWeight(3);
        stroke(0);
        if (this.detecting) {
            stroke(255, 0, 0);
        }
        point(this.x, this.y);
    };
    Point.prototype.senseObj = function(that) {
        this.detecting = distance(this, that) < that.radius;
    };
    this.sPoints = [];
    for (var i = 0; i < this.senseAccu; i++) {
        var edge = this.x + this.radius;
        var fraction = ((i+1)/this.senseAccu)*this.sRadius;
        this.sPoints.push(new Point(edge + fraction, this.y));
    }
};
TestBall.prototype = Object.create(Ball.prototype);
TestBall.prototype.draw = function() {
    noFill();
    strokeWeight(1);
    stroke(0);
    if (this.objNear) {
        stroke(255, 0, 0);
    }
    ellipse(this.x, this.y, 2*this.radius, 2*this.radius);
    
    for (var i = 0; i < this.sPoints.length; i++) {
        this.sPoints[i].draw();
    }
    
};
TestBall.prototype.sense = function(arr) {
    this.objNear = false;  //reset
    for (var i = 0; i < this.sPoints.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            var pt = this.sPoints[i]; //alias
            pt.senseObj(arr[j]);
            this.objNear = this.objNear || pt.detecting;
            if (pt.detecting) {break;}  //if (this.objNear) {break;} ??
        }
    }
};

/*** CONTROLLED BALL ***/
var ControlledBall = function(x, y, radius) {
    Ball.call(this, x, y, radius);
};
ControlledBall.prototype = Object.create(Ball.prototype);
ControlledBall.prototype.update = function() {
    this.x = mouseX;
    this.y = mouseY;
};

var test = new TestBall(200, 200, 40);
var control = new ControlledBall(mouseX, mouseY, 10);

draw = function() {
    background(255);
    test.draw();
    test.sense([control]);
    control.draw();
    control.update();
};
