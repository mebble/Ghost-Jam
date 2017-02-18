//offsets by which the coord system differs from the default
var XOFF = width/2;
var YOFF = height/2;
angleMode = "degrees";

var distance = function(a, b) {
    return dist(a.x, a.y, b.x, b.y);
};

/*** BALL ***/
var Ball = function(r, theta, radius) {
    this.r = r;
    this.theta = theta;
    this.radius = radius;
    this.x = this.r * cos(this.theta);
    this.y = this.r * sin(this.theta);
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
    this.angVel = 1;
    this.sRadius = 3 * this.radius;
    this.somethingNear = false;
    this.sPoints = [];
    this.viewAngle = 90;
    this.direction = this.theta + 90;
    this.nearbyObject = undefined;
    
    //sensing accuracies
    this.radialAcc = 5;
    this.angAcc = 10;
    
    var Point = function(ball, r, rel_theta) {
        this.ball = ball;  //alias
        this.r = r;
        this.rel_theta = rel_theta;
        this.theta = this.ball.direction + this.rel_theta;
        this.x = this.r * cos(this.theta) + this.ball.x;
        this.y = this.r * sin(this.theta) + this.ball.y;
        this.detecting = false;
    };
    Point.prototype.draw = function() {
        strokeWeight(1);
        stroke(0);
        if (this.detecting) {
            stroke(255, 0, 0);
        }
        
        //minus parents coordinates because the point is drawn on parent's matrix
        //with parent at the origin
        point(this.x - this.ball.x, this.y - this.ball.y);
    };
    Point.prototype.senseDist = function(that) {
        this.detecting = distance(this, that) < that.radius;
    };
    Point.prototype.update = function() {
        this.theta = this.ball.direction + this.rel_theta;
        this.x = this.r * cos(this.theta) + this.ball.x;
        this.y = this.r * sin(this.theta) + this.ball.y;
    };
    
    //create points
    var halfView = floor(this.viewAngle/2);
    for (var i = 1; i <= this.radialAcc; i++) {
        for (var j = 1; j <= this.angAcc; j++) {
            var radEdge = this.radius;
            var angEdge = -halfView;
            var radFrac = (i/this.radialAcc) * (this.sRadius - this.radius);
            var angFrac = (j/this.angAcc) * this.viewAngle;
            
            this.sPoints.push(new Point(this, radEdge + radFrac, angEdge + angFrac));
        }
    }
};
TestBall.prototype = Object.create(Ball.prototype);
TestBall.prototype.draw = function() {
    noFill();
    pushMatrix();
        translate(this.x, this.y);
        
        //sensing region
        stroke(224, 224, 224);
        ellipse(0, 0, 2*this.sRadius, 2*this.sRadius);
        
        //rotation of position of points is handled inside every point object
        //hence their drawing is kept outside the influence of rotate(this.direction)
        for (var i = 0; i < this.sPoints.length; i++) {
            this.sPoints[i].draw();
        }
        
        rotate(this.direction);
        
        //draw ball
        stroke(0);
        if (this.somethingNear) {
            stroke(255, 0, 0);
        }
        strokeWeight(1);
        ellipse(0, 0, 2*this.radius, 2*this.radius);
        line(0, 0, 0 + this.radius, 0);
    popMatrix();
};
TestBall.prototype.sense = function(arr) {
    this.somethingNear = false;  //reset
    this.nearbyObject = undefined;  //reset
    for (var i = 0; i < this.sPoints.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            var point = this.sPoints[i]; //alias
            var ball = arr[j];           //alias
            
            point.senseDist(ball);
            if (point.detecting) {
                this.somethingNear = true;
                this.nearbyObject = ball;
                break;
            }
        }
    }
};
TestBall.prototype.update = function() {
    this.direction = this.theta + 90;
    if (this.theta >= 180) {
        this.theta = this.theta - 360;  //ensures -180 <= this.theta <= 180
    }
    this.theta += this.angVel;
    
    this.x = this.r * cos(this.theta);
    this.y = this.r * sin(this.theta);
    
    for (var i = 0; i < this.sPoints.length; i++) {
        this.sPoints[i].update();
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

var test = new TestBall(100, 270, 10);
var control = new ControlledBall(150, 0, 10);

draw = function() {
    background(255);
    pushMatrix();
        translate(XOFF, YOFF);
        test.draw();
        control.draw();
    popMatrix();
    test.sense([control]);
    test.update();
    control.update();
};
