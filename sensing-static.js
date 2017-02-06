//offsets by which the coord system differs from the default
var XOFF = width/2;
var YOFF = height/2;

var distance = function(obj1, obj2) {
    return dist(obj1.x, obj1.y, obj2.x, obj2.y);
};

/*** BALL ***/
var Ball = function(r, theta, radius) {
    this.r = r;
    this.theta = theta;
    this.x = this.r * cos(this.theta);
    this.y = this.r * sin(this.theta);
    this.radius = radius;
};
Ball.prototype.draw = function() {
    noFill();
    stroke(0);
    strokeWeight(1);
    ellipse(this.x, this.y, 2*this.radius, 2*this.radius);
};

/*** TEST BALL ***/
var TestBall = function(r, theta, radius) {
    Ball.call(this, r, theta, radius);
    this.sRadius = 3 * this.radius;
    this.objNear = false;
    this.senseAccu = 5;
    
    var Point = function(parent, r, theta) {
        this.r = r;
        this.theta = theta;
        this.x = parent.x + this.r * cos(this.theta);
        this.y = parent.y + this.r * sin(this.theta);
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
    Point.prototype.detect = function(that) {
        return distance(this, that) < that.radius;
    };
    this.sPoints = [];
    for (var i = 1; i <= this.senseAccu; i++) {
        for (var j = 0; j < 1; j += 1) {
            var edge = this.radius;
            var senseWidth = this.sRadius - this.radius;
            var fraction = ((i)/this.senseAccu) * senseWidth;
            this.sPoints.push(new Point(this, edge + fraction, j));
        }
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
    
    //sensing region
    stroke(224, 224, 224);
    ellipse(this.x, this.y, 2*this.sRadius, 2*this.sRadius);
    
    for (var i = 0; i < this.sPoints.length; i++) {
        this.sPoints[i].draw();
    }
    
};
TestBall.prototype.sense = function(arr) {
    this.objNear = false;  //reset
    for (var i = 0; i < this.sPoints.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            var pt = this.sPoints[i]; //alias
            pt.detecting = pt.detect(arr[j]);
            this.objNear = this.objNear || pt.detecting;
            if (pt.detecting) {break;}  //if (this.objNear) {break;} ??
        }
    }
};

/*** CONTROLLED BALL ***/
var ControlledBall = function(r, theta, radius) {
    Ball.call(this, r, theta, radius);
    this.x = mouseX - XOFF;
    this.y = mouseY - YOFF;
};
ControlledBall.prototype = Object.create(Ball.prototype);
ControlledBall.prototype.update = function() {
    this.x = mouseX - XOFF;
    this.y = mouseY - YOFF;
};

var test = new TestBall(0, 0, 20);
var control = new ControlledBall(150, 0, 10);

draw = function() {
    background(255);
    pushMatrix();
        translate(XOFF, YOFF);
        test.draw();
        control.draw();
    popMatrix();
    test.sense([control]);
    control.update();
};
