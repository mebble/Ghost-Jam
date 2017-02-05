var distance = function(obj1, obj2) {
    return dist(obj1.x, obj1.y, obj2.x, obj2.y);
};

var Ball = function(x, y, radius) {
    /**
     * Ball position is based on polar coordinates, i.e.
     * angle and radial distance. Instantiation of objects is done
     * in cartesian coordinates, but that's translated to polar
     * through dist() and atan2().
     * The polar are then translated back to cartesian to draw the object.
     */
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sRadius = 3*this.radius;
    this.radDist = dist(this.x, this.y, 0, 0);
    this.angle = atan2(this.y, this.x);
    this.angVel = 5;
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
Ball.prototype.draw = function() {
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
Ball.prototype.update = function() {
    this.x = this.radDist * cos(this.angle);
    this.y = this.radDist * sin(this.angle);
    
    this.angle += this.angVel;
};
Ball.prototype.sense = function(arr) {
    for (var i = 0; i < this.sPoints.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            var pt = this.sPoints[i];
            pt.senseObj(arr[j]);
            this.objNear = this.objNear || pt.detecting;
        }
    }
};
var test = new Ball(200, 200, 20);

draw = function() {
    background(255);
    test.draw();
};
