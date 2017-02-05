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
    this.sPoints = [new Point(this.x + (1/3)*this.sRadius, this.y),
                    new Point(this.x + (2/3)*this.sRadius, this.y),
                    new Point(this.x + this.sRadius, this.y)];
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
    for (var i = 0; i < this.sPoints.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            var pt = this.sPoints[i]; //alias
            pt.senseObj(arr[j]);
            if (pt.detecting) {break;}
        }
    }
    
    this.objNear = this.sPoints[0].detecting ||
                   this.sPoints[1].detecting ||
                   this.sPoints[2].detecting;
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

var test = new TestBall(200, 200, 50);
var control = new ControlledBall(mouseX, mouseY, 20);

draw = function() {
    background(255);
    test.draw();
    test.sense([control]);
    control.draw();
    control.update();
};
