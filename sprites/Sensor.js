var Sensor = function(owner, radialDist, relTheta) {
	this.owner = owner;
	this.radialDist = radialDist;
	this.relTheta = relTheta;
	this.theta = this.owner.direction + this.relTheta;
	this.x = this.radialDist * cos(this.theta) + this.owner.x;
	this.y = this.radialDist * sin(this.theta) + this.owner.y;
	this.detecting = false;
};
Sensor.prototype.draw = function() {
	strokeWeight(1);
	stroke(0);
	if (this.detecting) {
		stroke(255, 0, 0);
	}
	//minus owner's coordinates because the point is drawn on owner's matrix
    	//with owner at the origin. The information though (this.x and this.y)
    	//have to be with respect to the global matrix
    	point(this.x - this.owner.x, this.y - this.owner.y);
};
Sensor.prototype.senseDist = function(that) {
	this.detecting = distance(this, that) < that.size;
};
Sensor.prototype.update = function() {
	this.theta = this.owner.direction + this.relTheta;
	this.x = this.radialDist * cos(this.theta) + this.owner.x;
	this.y = this.radialDist * sin(this.theta) + this.owner.y;
};
