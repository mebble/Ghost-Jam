var XOFF = width/2;
var YOFF = height/2;
angleMode = "degrees";

var distance = function(a, b) {
	return dist(a.x, a.y, b.x, b.y);
};

var SelfDriving = function(radialDist, theta, radius, normVel) {
	this.radialDist = radialDist;
	this.theta = theta;
	this.radius = radius;
	this.normVel = normVel;
	this.angVel = this.normVel;
	this.sRadius = 3 * this.radius;
	this.viewAngle = 90;
	this.direction = this.theta + 90;
	this.gap = 10;
	this.somethingNear = false;
	this.nearbyObject = undefined;
	this.sPoints = [];

	//sensing accuracies
	this.radialAcc = 5;
	this.angAcc = 10;
};
SelfDriving.prototype.draw = function() {
	noFill();
	pushMatrix();
		translate(this.x, this.y);
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
SelfDriving.prototype.sense = function(external) {
	this.somethingNear = false;  //resets
	this.nearbyObject = undefined;

	for (var i = 0; i < this.sPoints.length; i++) {
		for (var j = 0; j < external.length; j++) {
			var point = this.sPoints[i];   //aliases
			var obj = external[j];

			point.senseDist(obj);
			if (point.detecting) {
				this.somethingNear = true;
				this.nearbyObject = obj;
				break;
			}
		}
	}
};
SelfDriving.prototype.update = function() {
	this.theta += this.angVel;
	if (this.theta >= 180) {
		this.theta = this.theta - 360; //ensures -180 <= this.theta <= 180
	}

	this.x = this.radialDist * cos(this.theta);
	this.x = this.radialDist * sin(this.theta);
	this.direction = this.theta + 90;

	//update sensing points
	//update angular velocity
};

draw = function() {
	background(255);
	pushMatrix();
		translate(XOFF, YOFF);
	popMatrix();
}
