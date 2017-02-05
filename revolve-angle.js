
angleMode = "degrees";

var displayInfo = function(object) {
    var prec = 3;
    var x = object.x.toFixed(prec);
    var y = object.y.toFixed(prec);
    var angle = object.angle.toFixed(prec);
    var aVel = object.angVel.toFixed(prec);
    var rad = object.radDist.toFixed(prec);
    
    fill(0);
    textAlign(CENTER);
    text('x = ' + x + ' y = ' + y, 200, 200);
    text('theta = ' + angle, 200, 220);
    text(' sin = ' + sin(angle).toFixed(prec) +
         ' cos = ' + cos(angle).toFixed(prec), 200, 240);
    text('radial distance = ' + rad, 200, 260);
    text('angular vel = ' + aVel, 200, 280);
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
    this.radDist = dist(this.x, this.y, 0, 0);
    this.angle = atan2(this.y, this.x);
    this.angVel = 5;
};
Ball.prototype.draw = function() {
    noFill();
    stroke(0);
    ellipse(this.x, this.y, 2*this.radius, 2*this.radius);
};
Ball.prototype.update = function() {
    this.x = this.radDist * cos(this.angle);
    this.y = this.radDist * sin(this.angle);
    
    this.angle += this.angVel;
};

var ball = new Ball(200, 0, 20);

draw = function() {
    background(255);
    pushMatrix();
    translate(width/2, height/2);
    ball.draw();
    popMatrix();
    ball.update();
    displayInfo(ball);
};

var pause = false;
keyPressed = function() {
    if (key.toString() === ' ') {
        if (!pause) {
            noLoop();
        } else {
            loop();
        }
        pause = !pause;
    }
};
