var SelfDriving = function(radialDist, theta, size, normVel) {
	this.radialDist = radialDist;
	this.theta = theta;
	this.size = size;
	this.normVel = normVel;
	this.angVel = this.normVel;
	this.sensingRange = 3 * this.size;
	this.viewAngle = 90;
	this.direction = this.theta + 90;
	this.followingDist = 10;
	this.somethingNear = false;
	this.nearbyObject = undefined;
	this.sensors = [];

	//sensing accuracies
	this.radialAcc = 5;
	this.angAcc = 10;

	this.initSensors();
};
SelfDriving.prototype.draw = function() {
	noFill();
	pushMatrix();
		translate(this.x, this.y);
		/* <draw sensors and sensing region here> */
		rotate(this.direction);

		//draw ball
		stroke(0);
		if (this.somethingNear) {
			stroke(255, 0, 0);
		}
		strokeWeight(1);
		ellipse(0, 0, 2*this.size, 2*this.size);
		line(0, 0, 0 + this.size, 0);
	popMatrix();
};
SelfDriving.prototype.sense = function(environment) {
	//resets
	this.somethingNear = false;
	this.nearbyObject = undefined;

	for (var i = 0; i < this.sensors.length; i++) {
		for (var j = 0; j < environment.length; j++) {
			//aliases
			var sensor = this.sensors[i];
			var obj = environment[j];

			sensor.senseDist(obj);
			if (sensor.detecting) {
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
	this.y = this.radialDist * sin(this.theta);
	this.direction = this.theta + 90;

	//update sensors
	for (var i = 0; i < this.sensors.length; i++) {
		this.sensors[i].update();
	}

	//update angular velocity
	if (this.nearbyObject) {
		var d = distance(this, this.nearbyObject) - (this.size + this.nearbyObject.size);
		var slope = this.normVel / ((this.sensingRange - this.size) - this.followingDist);
		this.angVel = slope * (d - this.followingDist); //y = m * (x - x-intercept)
	} else {
		this.angVel = this.normVel;
	}
};
SelfDriving.prototype.initSensors = function() {
	var halfView = floor(this.viewAngle / 2);
	for (var i = 1; i <= this.radialAcc; i++) {
		for (var j = 1; j <= this.angAcc; j++) {
			var radEdge = this.size;
			var angEdge = -halfView;
			var radFrac = (i / this.radialAcc) * (this.sensingRange - this.size);
			var angFrac = (j / this.angAcc) * (this.viewAngle);

			this.sensors.push(new Sensor(this, radEdge + radFrac, angEdge + angFrac));
		}
	}
};
